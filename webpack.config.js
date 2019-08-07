const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

// "dev": "webpack-dev-server --mode development --open --hot",

module.exports = {
  entry: ['./src/js/app.js',
          './src/sass/app.scss'],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "js/app.js"
  },
  devtool: 'source-map',
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   compress: true,
  //   port: 9000
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader?url=false", "sass-loader"]
        })
      },
      {
        test: /\.pug$/,
        use: ['html-loader?attrs=false', 'pug-html-loader?pretty=true']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/app.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'templates/about.html',
      template: 'src/pug/pages/about.pug',
      inject: false,
      pretty: true
    }),
    new HtmlWebpackPlugin({
      filename: 'templates/delivery.html',
      template: 'src/pug/pages/delivery.pug',
      inject: false,
      pretty: true
    }),
    new HtmlWebpackPlugin({
      filename: 'templates/business.html',
      template: 'src/pug/pages/business.pug',
      inject: false,
      pretty: true
    }),
    new HtmlWebpackPlugin({
      filename: 'templates/drivers.html',
      template: 'src/pug/pages/drivers.pug',
      inject: false,
      pretty: true
    }),
    new HtmlWebpackPlugin({
      filename: 'templates/entry.html',
      template: 'src/pug/pages/entry.pug',
      inject: false,
      pretty: true
    }),
    new CopyWebpackPlugin([{
      from: './src/img',
      to: './img'
    }])
  ]
};