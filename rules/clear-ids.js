module.exports = {
  model_properties: function(property, value) {
    if (property == 'id') {
      throw new Error('Can not use `id`, should prefix this like `item_id`');
    }
  }
}
