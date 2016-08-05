'use strict';

module.exports = {
  paths: function(url, endpoint, api, config) {
    return new Promise(function(resolve, reject) {
      var errors = [];
      
      for (let method in endpoint) {
        config.rules.paths.produces.forEach(function(type) {
          if (endpoint[method].produces.indexOf(type) < 0) {
            errors.push('Expected ' + method.toUpperCase() + ' ' + url + ' to produce content-type of `' + type + '`');
          }
        });
      }

      resolve(errors);
    });
  }
}
