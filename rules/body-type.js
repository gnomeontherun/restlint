'use strict';

module.exports = {
  paths: function(url, endpoint, api, config) {
    return new Promise(function(resolve, reject) {
      var errors = [];
      var isItem = (url.trim().charAt(url.length - 1) == '}');

      for (let method in endpoint) {
        // Get responses depend on if the endpoint is an item or collection
        if (method === 'get') {
          for (let response in endpoint[method].responses) {
            // Check for only successful responses
            if (response >= 200 && response < 300) {
              // Check if is an item or collection endpoint
              if (isItem && endpoint[method].responses[response].schema.type != 'object') {
                errors.push('Expected item endpoint ' + method.toUpperCase() + ' ' + url + ' to return an object');
              } else if (!isItem && endpoint[method].responses[response].schema.type != 'array') {
                errors.push('Expected collection endpoint ' + method.toUpperCase() + ' ' + url + ' to return an array');
              }
            }
          }
        }
      }

      resolve(errors);
    });
  }
}
