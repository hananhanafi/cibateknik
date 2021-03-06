
import cibateknikrouter from "./router";
export default {
  ...cibateknikrouter,
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
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
    // ...
    'quill/dist/quill.core.css',
    // for snow theme
    'quill/dist/quill.snow.css',
    // for bubble theme
    // 'quill/dist/quill.bubble.css'
    // ...
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/vue-swiper.js','~/plugins/firebase.js',
    '~/plugins/api.js','~/plugins/v-calendar','~/plugins/vue2-datepicker','~/plugins/vue2-daterangepicker',{ src: '~plugins/nuxt-quill', ssr: false }],
    // "{ src: '~/plugins/vue-datepicker', mode: 'client' }"],

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
          icons: ['faLightbulb','faShoppingCart','faHandHoldingUsd','faCoins','faDonate','faUsers','faEye','faEyeSlash','faSearch','faBell','faTrash','faPencilAlt','faTimes','faPlus','faMinus','faArrowLeft','faArrowRight','faChevronRight','faChevronLeft','faChevronUp','faChevronDown','faAngleRight','faAngleLeft','faHeart','faUniversity','faCreditCard','faStore','faWallet','faHome','faUser','faFilter','faBars','faUpload','faFileUpload','faCloudUploadAlt','faColumns','faBoxes','faChartBar','faInbox','faCheckCircle','faTimesCircle','faExclamation','faExclamationCircle','faExclamationTriangle','faDatabase','faShippingFast','faCheck','faHistory','faCircle']
          },
          {set: '@fortawesome/free-brands-svg-icons',
          icons: ['faGithub','faWhatsapp','faWhatsappSquare','faInstagram','faInstagramSquare','faFacebook','faFacebookSquare','faFacebookF']
          },
          {set: '@fortawesome/free-regular-svg-icons',
          icons: ['faLightbulb','faHeart','faCheckCircle','faTimesCircle']
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
    
    '@nuxtjs/toast',

    'nuxt-material-design-icons'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},
  
  // vuetoasted
  toast: {
    position: 'top-right',
    // iconPack: 'fontawesome',
    duration:5000,
    // register: [ // Register custom toasts
    //   {
    //     name: 'my-error',
    //     message: 'Oops...Something went wrong',
    //     options: {
    //       iconPack: 'fontAwesome',
    //       duration:3,
    //       type: 'error'
    //     }
    //   }
    // ]
  },
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
