module.exports = {
  paths: function(url, endpoint, api, config) {
    return new Promise(function(resolve, reject) {
      var errors = [];
      var parts = url.split('/');
      var last = '';
      
      parts.forEach(function(part) {
        if (part && last && (part[0] == last[0] || (part[0] != '{' && last[0] != '{'))) {
          errors.push(`Path hierarchy contains inappropriate order with ${last}/${part} in ${url}`);
        }
        last = part;
      });

      resolve(errors);
    });
  }
}
