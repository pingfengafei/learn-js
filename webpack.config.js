/**
 * Created by pingfengafei on 3/14/17.
 */
/**
 * Created by pingfengafei on 2/28/17.
 */
/**
 * 注意webpack1，2的不同
 * 考虑到兼容性问题，选择require，而非import
 */

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH = {
  ROOT: path.resolve(__dirname),
  SRC: path.resolve(__dirname, 'src'),
  TEMPLATE: path.resolve(__dirname, 'template'),
  BUILD: path.resolve(__dirname, 'build'),
  NODE: path.resolve(__dirname, 'node_modules')
};

const __PROD__ = 'production';
const environment = process.env.NODE_ENV || __PROD__;

console.log(environment);

//通用配置项
const webpackConfig = {
  entry: {
    app: path.resolve(PATH.SRC, 'index.js'),
    //工具
    libs: [
      'react',
      'react-dom',
      'classnames',
      'redux',
      'react-redux',
      'lodash',
      'immutable',
    
    ]
  },
  output: {
    filename: '[name].[hash].js',
    path: PATH.BUILD,
    publicPath: '/'
  },
  /**
   * module.loaders被module.rules取代
   */
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: ExtractTextPlugin.extract({
          use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        })
      },
      {
        test: /\.j(s|sx)$/,
        loader: 'babel-loader',
        include: PATH.SRC,
        exclude: PATH.NODE
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader?hash=sha512&digest=hex&name=imgs/[hash].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff&prefix=fonts&name=fonts/[hash].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream&prefix=fonts&name=fonts/[hash].[ext]'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts&name=fonts/[hash].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml&prefix=fonts&name=fonts/[hash].[ext]'
      },
    
    ]
  },
  plugins: [
    //生成style.[has].css的独立文件
    new ExtractTextPlugin({
      filename: 'style.[hash].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'libs', file: 'libs.[hash].js'}), //把entry的lbs独立打包出来
    new HtmlWebpackPlugin({
      title: 'test title',
      template: path.resolve(PATH.TEMPLATE, 'index.html')
    }),
    // new webpack.NoErrorsPlugin() //生产环境保证no error
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ],
  resolve: {
    modules: [
      PATH.SRC,
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.es6', '.css', '.less', 'png', 'jpeg', 'jpg'],
    alias: {
      'react': path.resolve(PATH.NODE, 'react/dist/react.min'),
      'react-dom': path.resolve(PATH.NODE, 'react-dom/dist/react-dom.min'),
      'redux': path.resolve(PATH.NODE, 'redux/dist/redux.min'),
      'react-redux': path.resolve(PATH.NODE, 'react-redux/dist/react-redux.min'),
      'immutable': path.resolve(PATH.NODE, 'immutable/dist/immutable.min'),
      'lodash': path.resolve(PATH.NODE, 'lodash/lodash.min')
    }
  }
};

//生产环境配置项
if (environment == __PROD__) {
  webpackConfig.plugins.push(
    //优化
    new CleanWebpackPlugin(PATH.BUILD), //每次build，先删除build文件夹
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 51200}), //小于50k的文件会被合并
    new webpack.optimize.UglifyJsPlugin({//压缩js，css也在js中
      compress: {
        warnings: false
      },
      comments: false,
      sourceMap: false
    }),
    /**
     * 存疑？
     * ProvidePlugin提供build下的全局变量
     * expose-loader提供运行时的全局变量
     */
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom'
    })
  )
} else {//开发环境
  webpackConfig.module.rules.push(
    {
      test: /\.j(s|sx)$/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: 'eslint-loader'
    }
  );
  
  webpackConfig.devtool = '#cheap-module-eval-source-map';
  
  webpackConfig.devServer = {
    host: '0.0.0.0',
    port: '8888',
    proxy: {
      '/*.*': {
        target: '127.0.0.1:9999'
      },
      // rewrite: function (req) {
      //   req.url = 'index.html';  // Send to react app
      // }
    },
    inline: true,
    historyApiFallback: true
  }
}

module.exports = webpackConfig;

