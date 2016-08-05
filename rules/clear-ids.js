'use strict';

module.exports = {
  models: function(model, api, config) {
    return new Promise(function(resolve, reject) {
      var errors = [];

      for (let property in model.properties) {
        if (property == 'id') {
          errors.push(['Can not use `id`, should prefix this like `item_id`']);
        }
      };
      
      resolve(errors);
    });
  }
}
