const isPlural = require('is-plural');

module.exports = {
  path_url: function(path, value) {
    return new Promise(function(resolve, reject) {
      var errors = [];
      var parts = path.split('/');
      parts.forEach(function(part) {
        if (part && part[0] != '{' && !isPlural(part)) {
          errors.push(`Path contains a singular term '${part}' in ${path}`);
        }
      });

      resolve(errors);
    });
  }
}
