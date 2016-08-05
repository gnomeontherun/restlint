// Create the default config object
const config = {
  rules: {
    definition: {
      swaggerVersion: '2.0' 
    },
    paths: {
      consumes: ['application/json'],
      produces: ['application/json']
    }
  },
  paths: {
    '/apps/{app_id}/container/start': {
      post: {
        consumes: ['multipart/form-data']
      }
    }
  }
};

module.exports = config;
