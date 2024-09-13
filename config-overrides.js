const path = require('path');

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@redux': path.resolve(__dirname, 'src/redux'),  // Alias cho redux
    '@components': path.resolve(__dirname, 'src/components')  // Alias cho components
  };
  return config;
};
