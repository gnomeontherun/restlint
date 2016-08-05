const isPlural = require('is-plural');

module.exports = {
  paths: function(url, endpoint, api, config) {
    return new Promise(function(resolve, reject) {
      var errors = [];
      var parts = url.split('/');
      
      parts.forEach(function(part) {
        if (part && part[0] != '{' && !isPlural(part)) {
          errors.push(`Path contains a singular term '${part}' in ${url}`);
        }
      });

      resolve(errors);
    });
  }
}
