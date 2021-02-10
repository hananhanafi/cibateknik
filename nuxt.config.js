
import cibateknikrouter from "./router";
export default {
  ...cibateknikrouter,
  ssr: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'cibateknik',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // CSS file in the project
    '~/assets/css/main.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    ['nuxt-fontawesome', {
      component: 'fa', 
      imports: [{
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faLightbulb','faShoppingCart','faHandHoldingUsd','faCoins','faDonate','faUsers','faEye','faEyeSlash','faSearch','faBell','faTrash','faPencilAlt','faTimes','faPlus','faMinus']
          },
          {set: '@fortawesome/free-brands-svg-icons',
          icons: ['faGithub']
          },
          {set: '@fortawesome/free-regular-svg-icons',
          icons: ['faLightbulb']
          },
      ]
    }]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // extend(config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  },

  pwa: {
    meta: {
      title: 'Cibateknik PWA',
      author: 'Hanan Hanafi',
    },
    manifest: {
      name: 'Cibateknik PWA',
      short_name: 'Cibateknik',
      lang: 'id',
    },
  }
}
