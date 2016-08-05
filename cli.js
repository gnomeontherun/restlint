#! /usr/bin/env node

'use strict';

const program = require('commander');
const hooks = require('./lib/hooks');
const chalk = require('chalk');
const errors = [];
const promises = [];
const config = require('./lib/config');

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

    // Check swagger file
    hooks.definition.forEach(function(hook) {
      promises.push(hook(api, config));
    });

    // Check models
    for (let model in api.definitions) {
      hooks.models.forEach(function(hook) {
        promises.push(hook(api.definitions[model], api, config));
      });
    }

    // Check paths
    for (let path in api.paths) {
      hooks.paths.forEach(function(hook) {
        promises.push(hook(path, api.paths[path], api, config));
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
    console.error(error.message);
  });

})
.parse(process.argv);
