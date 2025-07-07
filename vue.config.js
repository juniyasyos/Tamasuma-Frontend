const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  productionSourceMap: false,
  pwa: {
    name: 'Tamasuma Main',
    // workboxPluginMode: 'InjectManifest',
    themeColor: '#4A90E2',
    msTileColor: '#4A90E2',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      background_color: "#ffffff"
    },
    // workboxOptions: {
    //   swSrc: './src/sw.js',
    //   swDest: 'service-worker.js',
    // },
  }
})