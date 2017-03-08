/**
 * Created by pingfengafei on 2/28/17.
 */
/**
 * 注意webpack1，2的不同
 * 考虑到兼容性问题，选择require，而非import
 */

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATH = {
  ROOT_PATH: path.resolve(__dirname),
  SRC_PATH: path.resolve(this.ROOT_PATH, 'src'),
  TEMPLATE_PATH: path.resolve(this.ROOT_PATH, 'template'),
  BUILD_PATH: path.resolve(this.ROOT_PATH, 'build'),
  NODE_PATH: path.resolve(this.ROOT_PATH, 'node_modules')
};

const __PROD__ = 'production';
const environment = process.env.NODE_ENV || __PROD__;

//通用配置项
const webpackConfig = {
  entry: {},
  output: {},
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
        include: PATH.SRC_PATH,
        exclude: PATH.NODE_PATH
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file?hash=sha512&digest=hex&name=imgs/[hash].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts&name=fonts/[hash].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts&name=fonts/[hash].[ext]'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts&name=fonts/[hash].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts&name=fonts/[hash].[ext]'
      },
    
    ],
    plugins: [
      //生成style.[has].css的独立文件
      new ExtractTextPlugin({
        filename: 'style.[hash].css',
        disabled: false,
        allChunks: true
      })
    ]
  },
  resolve: {
    modules: [
      PATH.SRC_PATH,
      'node_modules'
    ],
    extensions: ['', 'js', 'jsx']
  }
};

//生产环境配置项
if (environment == __PROD__) {
  webpackConfig.plugins.push(
    //优化
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 51200}), //小于50k的文件会被合并
    new webpack.optimize.UglifyJsPlugin({//压缩js，css也在js中
      compress: {
        warnings: false
      },
      comments: false,
      sourceMap: false
    }),
    
    //
  
  
  );
}
//开发环境配置项
else {
  webpackConfig.module.rules.push(
    {
      test: '/\.j(s|sx)$/',
      enforce: 'pre',
      loader: 'eslint-loader'
    }
  );
  
  webpackConfig.devtool = '#cheap-module-eval-source-map';
  
  webpackConfig.devServer = {
    host: '0.0.0.0',
    port: '9999',
    proxy: {
      '/*.*': {
        target: '127.0.0.1:9999'
      },
      rewrite: function (req) {
        req.url = 'index.html';  // Send to react app
      }
    }
  }
}


module.exports = webpackConfig;

