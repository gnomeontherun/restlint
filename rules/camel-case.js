function checkCamelCase(property, value) {
  return new Promise(function(resolve, reject) {
    var errors = [];

    if (property.search('[A-Z]') >= 0) {
      errors.push('Expected object property ' + property + ' to be snake case');
    }

    resolve(errors);
  });
}

module.exports = {
  model_properties: checkCamelCase,
  request_properties: checkCamelCase,
  response: checkCamelCase
}
