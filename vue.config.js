const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: false,
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
  },
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
    workboxOptions: {
      // swSrc: './src/sw.js',
      // swDest: 'service-worker.js',
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    },
  },
})
