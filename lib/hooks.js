'use strict';

var fs = require('fs');

// Maintain a copy of all of the hooks to execute
const hooks = {
  model_properties: [],
  path_url: [],
  request_properties: [],
  response: []
};

var root = require('path').join(__dirname, '../rules');

fs.readdirSync(root).forEach(function(file) {
  var rules = require('../rules/' + file);
  for (let rule in rules) {
    hooks[rule].push(rules[rule]);
  }
});

module.exports = hooks;
