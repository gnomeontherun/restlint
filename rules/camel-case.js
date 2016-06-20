function checkCamelCase(property, value) {
  if (property.search('[A-Z]') >= 0) {
    throw new Error('Expected object property ' + property + ' to be snake case');
  }
}

module.exports = {
  model_properties: checkCamelCase,
  request_properties: checkCamelCase,
  response_properties: checkCamelCase
}
