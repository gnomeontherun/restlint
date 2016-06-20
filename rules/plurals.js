const isPlural = require('is-plural');

module.exports = {
  path_url: function(path, value) {
    var parts = path.split('/');
    parts.forEach(function(part) {
      if (part && part[0] != '{' && !isPlural(part)) {
        throw new Error(`Path contains a singular term '${part}' in ${path}`);
      }
    });
  }
}
