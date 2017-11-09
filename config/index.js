// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/banner': {
            target: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
            changeOrigin: true,
            pathRewrite: {
                '^/banner': ''
            }
        },
        '/gedan_data': {
            target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
            changeOrigin: true,
            pathRewrite: {
                "^/gedan_data": ''
            },
            onProxyReq(onProxyReq, req, res) {
                onProxyReq.setHeader('Host','c.y.qq.com')
                onProxyReq.setHeader('referer','https://c.y.qq.com/')
            }
        },
        '/getLyric': {
            target: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
            changeOrigin: true,
            pathRewrite: {
                "^/getLyric": ''
            },
            onProxyReq(onProxyReq, req, res) {
               onProxyReq.setHeader('Host','c.y.qq.com')
               onProxyReq.setHeader('referer','https://c.y.qq.com/') 
            }
        },
        '/geDanDetail': {
            target: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
            changeOrigin: true,
            pathRewrite: {
                "^/geDanDetail": ''
            },
            onProxyReq(onProxyReq, req, res) {
               onProxyReq.setHeader('Host','c.y.qq.com')
               onProxyReq.setHeader('referer','https://c.y.qq.com/') 
            }
        },
        '/rankData': {
            target: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
            changeOrigin: true,
            pathRewrite: {
                '^/rankData': ''
            },
            onProxyReq(onProxyReq, req, res) {
               onProxyReq.setHeader('Host','c.y.qq.com')
               onProxyReq.setHeader('referer','https://c.y.qq.com/') 
            }
        },
        '/topData': {
            target: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
            changeOrigin: true,
            pathRewrite: {
                '^/topData': ''
            },
            onProxyReq(onProxyReq, req, res) {
               onProxyReq.setHeader('Host','c.y.qq.com')
               onProxyReq.setHeader('referer','https://c.y.qq.com/') 
            }
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
