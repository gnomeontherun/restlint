module.exports = {
  definition: function(definition, config) {
    return new Promise(function(resolve, reject) {
      var errors = [];

      if (parseFloat(definition.swagger) < parseFloat(config.rules.definition.swaggerVersion)) {
        errors.push(['Using older swagger version, please use ' + config.definition.swaggerVersion]);
      }
      
      resolve(errors);
    });
  }
}
