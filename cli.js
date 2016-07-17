#! /usr/bin/env node

'use strict';

const program = require('commander');
const hooks = require('./lib/hooks');
const chalk = require('chalk');
const errors = [];
const promises = [];

// Show help by default if no values are passed
if (!process.argv.slice(2).length) {
  program.outputHelp();
  return;
}

// Define the program
program
.version('0.1.0')
.arguments('<definition>')
.action(function(definition, env) {
  const parser = require('swagger-parser');
  parser
  .validate(definition)
  .then(function(api) {
    
    // Check models
    for (let model in api.definitions) {
      let schema = api.definitions[model];
      // Check each property
      for (let property in schema.properties) {
        hooks.model_properties.forEach(function(hook) {
          promises.push(hook(property, schema.properties[property]))
        });
      }
    }

    // Check uris
    for (let path in api.paths) {
      let endpoint = api.paths[path];
      hooks.path_url.forEach(function(hook) {
        promises.push(hook(path));

        // Check methods
        for (let method in endpoint) {
          for (let response in endpoint[method].responses) {
            hooks.response.forEach(function(hook) {
              promises.push(hook(response, endpoint[method].responses[response]));
            });
          }
        }
      });
    }

    // Handle all promises and report out
    Promise.all(promises).then(function(results) {
      var errors = 0;
      results.forEach(function(result) {
        if (result.length) {
          result.forEach(function(line) {
            errors += 1;
            console.log(chalk.red(' > ' + line));
          });
        }
      });

      // Check for errors in the run and report status
      if (errors) {
        console.log('');
        console.log(chalk.red(errors + ' errors found'))
      } else {
        console.log(chalk.green('No errors found.'));
      }
    }).catch(function(error) {
      // Catch any catastrophic errors and report when possible
      console.log(error);
    });

  })
  .catch(function(error) {
    // Unable to parse swagger, sorry :(
    console.error(error);
  });

})
.parse(process.argv);
