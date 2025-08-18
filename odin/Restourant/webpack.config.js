// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development', // Or 'production' for a production build
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};