module.exports = {
  path_url: function(path, value) {
    var parts = path.split('/');
    var last = '';
    parts.forEach(function(part) {
      if (part && last && (part[0] == last[0] || (part[0] != '{' && last[0] != '{'))) {
        throw new Error(`Path hierarchy contains inappropriate order with ${last}/${part} in ${path}`);
      }
      last = part;
    });
  }
}
