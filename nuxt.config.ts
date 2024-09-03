// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  build: {
    transpile: ['vuetify'],
  },
  app: {
    head: {
      title: 'Contact App',
    },
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'th', language: 'th-TH', file: 'th.json', name: 'Thai' },
    ],
    defaultLocale: 'en',
    langDir: 'locales',  
    strategy: 'no_prefix',  
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'locale',
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
