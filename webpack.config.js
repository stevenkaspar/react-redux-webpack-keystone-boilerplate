var webpack = require('webpack');
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const output = {
  development: {
    path: __dirname,
    publicPath: '/',
    filename: '[name].js'
  },
  production: {
    path: path.resolve(__dirname, './public/js/dist'),
    filename: '[name].js'
  }
}
const devtool = {
  development: '#source-map',
  production: ''
}
const entry = {
  development: {
    home: [
      'react-hot-loader/patch',
      // Add the client which connects to our middleware
      // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
      // useful if you run your app from another point like django
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      // And then the actual application
      './public/js/src/home.js'
    ],
    signin: './public/js/src/signin.js',
    'reset-password': './public/js/src/reset-password.js'
  },
  production: {
    home: './public/js/src/home.js',
    signin: './public/js/src/signin.js',
    'reset-password': './public/js/src/reset-password.js'
  }
}
const plugins = {
  development: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  production: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin()
  ]
}

const env_key = process.env.NODE_ENV === 'development' ? 'development' : 'production'

module.exports = {
  context: __dirname,
  entry:   entry[env_key],
  output:  output[env_key],
  devtool: devtool[env_key],
  plugins: plugins[env_key],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
					presets: [
						'es2015',
            'react',
            'stage-2'
					]
				},
      },
      {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};


// const path = require('path');
// const webpack = require('webpack');
//
// require('dotenv').config();
//
// module.exports = {
//   entry: [
//     'react-hot-loader/patch',
//     // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
//     './public/js/src/app.js'
//   ],
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, '/public/js/dist'),
//     publicPath: '/'
//   },
//   devServer: {
//     hot: true,
//     contentBase: './public',
//     inline: true,
//     publicPath: 'http://localhost:8080/',
//     port: 8080
//   },
//   devtool: process.env.NODE_ENV === 'development' ? 'source-map' : 'false',
//   plugins: [
//     new webpack.ProvidePlugin({
//       $: 'jquery',
//       jQuery: 'jquery',
//       'window.jQuery': 'jquery',
//       Popper: ['popper.js', 'default'],
//       // In case you imported plugins individually, you must also require them here:
//       Util: "exports-loader?Util!bootstrap/js/dist/util",
//       Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
//     }),
//     // new CleanWebpackPlugin(['dist']),
//     // new HtmlWebpackPlugin({
//     //   title: 'Hot Module Replacement'
//     // }),
//     new webpack.NamedModulesPlugin(),
//     new webpack.HotModuleReplacementPlugin()
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.(html|css|txt)$/,
//         use: 'raw-loader'
//       },
//       {
//         test: /\.scss$/,
//         use: [{
//           loader: "style-loader" // creates style nodes from JS strings
//         }, {
//           loader: "css-loader" // translates CSS into CommonJS
//         }, {
//           loader: "sass-loader" // compiles Sass to CSS
//         }]
//       },
//       {
//         test: /\.js$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: "babel-loader",
//         options: {
// 					presets: [
// 						'es2015',
//             'react',
//             'stage-2'
// 					]
// 				},
//       }
//     ]
//   }
// };
