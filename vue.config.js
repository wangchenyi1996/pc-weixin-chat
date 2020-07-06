// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)
let publicPath = process.env.NODE_ENV === 'production' ? '/test' : './'
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    productionSourceMap: false,

    lintOnSave: false, //关闭 eslint
    devServer: {
        port: 9527, // 端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            "/api": {
                target: "https://jsonplaceholder.typicode.com/posts/",
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    "^/api": "/"
                }
            }
        }
    },
    chainWebpack: config => {
        // 重新设置 alias
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@view', resolve('src/page'))
    },
    // CDN配置
    // configureWebpack: {
    //     externals: {
    //         'vue': 'Vue',
    //         'vuex': 'Vuex',
    //         'vue-router': 'VueRouter',
    //         'axios': 'axios'
    //     }
    // }
}