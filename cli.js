#! /usr/bin/env node

'use strict';

const program = require('commander');
const hooks = require('./lib/hooks');
const chalk = require('chalk');
const errors = [];

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
          try {
            hook(property, schema.properties[property]);
          } catch (error) {
            errors.push(error);
          }
        });
      }
    }

    // Check uris
    for (let path in api.paths) {
      let endpoint = api.paths[path];
      hooks.path_url.forEach(function(hook) {
        try {
          hook(path);
        } catch (error) {
          errors.push(error);
        }
      });
    }

    if (errors.length > 0) {
      console.log(chalk.red(errors.length + ' errors found'))
      errors.forEach(function(error) {
        console.log(chalk.red(error.message));
      });
    } else {
      console.log(chalk.green('No errors found.'))
    }
  })
  .catch(function(err) {
    console.error(err);
  });

})
.parse(process.argv);
