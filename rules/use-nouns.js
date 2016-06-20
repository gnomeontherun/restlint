const WP = require('wordpos');
const wordpos = new WP()

module.exports = {
  path_url: function(path, value) {
    // Split the words by camelCase, /, -, _
    var path = path.replace(/[\/\-_A-Z](?![^{]*})/g, ' $& ');
    var errors = [];
    console.log(path)
    wordpos.getVerbs(path, function(verbs) {
      console.log(verbs);
      if (verbs.length > 0) {
        errors.push(new Error('Endpoint `' + path + '` has a verb in the path'));
      }
    });

    if (errors.length) {
      errors.forEach(function(error) {
        throw error;
      });
    }
  }
}
