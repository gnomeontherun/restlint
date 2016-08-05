'use strict';

module.exports = {
  definition: function(definition, config) {
    return new Promise(function(resolve, reject) {
      var errors = [];
      var root = false;

      for (let path in definition.paths) {
        if (path === '/') {
          root = definition.paths[path].get.responses['200'];
          if (!root.schema.items.properties.version) {
            errors.push('Expected root to have a version property');
          }
        }
      }

      if (!root) {
        errors.push('Expected a root endpoint to exist.');
      }
      
      resolve(errors);
    });
  }
}
