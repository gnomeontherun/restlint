'use strict';

function checkCase(property) {
  return property.search('[A-Z]') >= 0;
}

module.exports = {
  models: function(model, api, config) {
    return new Promise(function(resolve, reject) {
      var errors = [];

      for (let property in model.properties) {
        if (checkCase(property)) {
          errors.push('Expected object property ' + property + ' not to be camel case');
        }
      }

      resolve(errors);
    });
  },
  paths: function(url, endpoint, api, config) {
    return new Promise(function(resolve, reject) {
      var errors = [];

      // Check for camel case in url
      if (checkCase(url)) {
        errors.push('Expected path ' + url + ' to use hyphens not camel case.');
      }

      // Check for camel case in other places
      // * response body (in case its not a model)
      // * request params

      resolve(errors);
    });
  }
}
