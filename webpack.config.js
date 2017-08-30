const webpack = require('webpack');
const ngtools = require('@ngtools/webpack');

module.exports = {
  entry: './src/main.server.ts',
  resolve: {extensions: ['.ts', '.js']},
  target: 'node',
  output: {filename: 'dist/server.js'},
  plugins: [
    new ngtools.AotPlugin({
      'entryModule': 'app/app.module.server#AppServerModule',
      'tsConfigPath': 'src/tsconfig.server.json',
      'skipCodeGeneration': true
    }),
    new webpack.LoaderOptionsPlugin({options: {postcss: {}}})
  ],
  module: {
    rules: [
      {test: /\.ts$/, loader: '@ngtools/webpack'},
      {test: /\.html$/, loader: 'raw-loader'},
      {
        test: /\.css$/,
        use:[
          'exports-loader?module.exports.toStoring()',
          'css-loader?{\'sourceMap\':false,\'importLoaders\':1)',
          'postcss-loader'
        ]
      }
    ]
  }
};

