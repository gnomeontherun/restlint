// const WP = require('wordpos');
// const wordpos = new WP();

// module.exports = {
//   path_url: function(path, value) {
//     return new Promise(function(reject, resolve) {
//       resolve([])
//       try {
//         if (!path) path = '';
//         // Split the words by camelCase, /, -, _
//         var words = path.replace(/[\/\-_A-Z](?![^{]*})/g, ' $& ');
//         var errors = [];

//         wordpos.getVerbs(words, function(verbs, err) {
//           console.log(verbs, err);
//           if (verbs.length > 0) {
//             errors.push('Endpoint `' + path + '` has a verb in the path');
//           }
//         });

//         console.log(words, errors);
//         resolve(errors);
//       } catch (err) {
//         reject(err);
//       }
//     });
//   }
// }
