babel-plugin-react-transform : 热加载，被React Hot Loader 3取代了
babel-preset-stage-0,1,2,3 : es7的4个阶段 3是最严格的，0是最宽泛的

  resolve: {
        root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }

extract-text-webpack-plugin : 将文件包中的文本解压缩到文件中，将css文件提取出来，放到**.css文件中（本来是放在bundle.js中）必须使用>=v2版本

css-loader 是处理css文件中的url()等

style-loader 将css插入到页面的style标签顺便告诉你

less-loader 是将less文件编译成css

sass-loader 是将sass文件编译成css

postcss-loader 预处理css

loader的加载顺序是从右往左，从下往上

babel-core :使用.babelrc内的配置项

webpack2 删除了所有自动添加-loader功能，需要手动添加

不在使用json-loader

new webpackConfig.optimize.DedupePlugin() 在生产环境中使用去除冗余的文件，webpack2已经不需要了，好像有什么tree来着？

new webpack.optimize.OccurrenceOrderPlugin(), //根据代码块被使用的次数赋值id，次数越多id越小，减小文件 webpack2不需要了

BannerPlugin 给每个生成的块添加横幅，标语

webpack cli更加严格了，具体我也不懂

CommonsChunkPlugin : 分离出文件

