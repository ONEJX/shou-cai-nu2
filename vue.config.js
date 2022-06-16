// eslint-disable-next-line @typescript-eslint/no-var-requires
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
const path = require('path')
module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/shou-cai-nu2-website/'
    : '/'  ,
  lintOnSave: false,
  chainWebpack:config=>{
    const dir = path.resolve(__dirname,'src/assets/icons')

    config.module
        .rule('svg-sprite')
        .test(/\.svg$/)
        .include.add(dir).end()
        .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false})
        .end()
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'),[{plainSprite:true}])
    config.module.rule('svg').exclude.add(dir)
  }
}
