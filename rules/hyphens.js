module.exports = {
  path_url: function(path, value) {
    return new Promise(function(resolve, reject) {
      var errors = [];

      // Make smarter to not include _ inside of {}
      if (path.search(/_/, 'gmi') >= 0) {
        errors.push('Expected path ' + path + ' to use hyphens not underscores');
      }

      resolve(errors);
    });
  }
}
