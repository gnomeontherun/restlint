module.exports = {
  model_properties: function(property, value) {
    return new Promise(function(resolve, reject) {
      var errors = [];

      if (property == 'id') {
        errors.push(['Can not use `id`, should prefix this like `item_id`']);
      }
      
      resolve(errors);
    });
  }
}
