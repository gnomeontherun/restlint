module.exports = {
  paths: function(url, endpoint, api, config) {
    return new Promise(function(resolve, reject) {
      var errors = [];

      // Make smarter to not include _ inside of {}
      if (url.search(/_/, 'gmi') >= 0) {
        errors.push('Expected path ' + url + ' to use hyphens not underscores');
      }

      resolve(errors);
    });
  }
}
