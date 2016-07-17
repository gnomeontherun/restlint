module.exports = {
  response: function(code, responses) {
    return new Promise(function(resolve, reject) {
      var errors = [];

      console.log(responses);

      if (code >= 200 && code < 300) {
        // errors.push(['Can not use `id`, should prefix this like `item_id`']);
      }
      
      resolve(errors);
    });
  }
}
