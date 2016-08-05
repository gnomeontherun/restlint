'use strict';

module.exports = {
  paths: function(url, endpoint, api, config) {
    return new Promise(function(resolve, reject) {
      var errors = [];
      

      for (let method in endpoint) {
        let types = [];
        if (config.paths[url] && config.paths[url][method] && config.paths[url][method].consumes) {
          types = config.paths[url][method].consumes;
        } else {
          types = config.rules.paths.consumes;
        }
        types.forEach(function(type) {
          if (endpoint[method].consumes.indexOf(type) < 0) {
            errors.push('Expected ' + method.toUpperCase() + ' ' + url + ' to consume content-type of `' + type + '`');
          }
        });
      }

      resolve(errors);
    });
  }
}
