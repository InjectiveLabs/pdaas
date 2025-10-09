const resolve = require('path').resolve
const { pwaMetaTags, manifestMetaTags } = require('@/nuxt-config/meta')

module.exports = {
  pwa: {
    icon: {
      fileName: resolve(process.cwd(), './public/pdaas.png'),
      source: resolve(process.cwd(), './public/pdaas.png')
    },

    meta: {
      favicon: true,
      ...pwaMetaTags
    },

    manifest: {
      ...manifestMetaTags
    }
  }
}
