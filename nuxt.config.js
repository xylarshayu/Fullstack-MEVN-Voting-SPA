export default {

  loading: {
    color: "#00a0ff",
    height: "3px",
    continuous: true,
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  loadingIndicator: {
    name: 'rotating-plane',
    color: 'rgb(255, 183, 66)',
    background: 'black',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'voter-space',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo_final.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', defer: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons+Outlined', defer: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://fonts.sandbox.google.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/css/flexbox.css',
    '~/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/auth-next'
  ],

  auth: {
    redirect: {
      login: '/',
      logout: '/',
      home: '/home',

    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          max_age: '60*60*4'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: '60*60*24'
        },
        user: {
          property: 'userData'
        },
        endpoints: {
          login: { url: '/api/users/login', method: 'post'},
          refresh: { url: '/api/users/refresh-token', method: 'post'},
          user: { url: '/api/users/getuser', method: 'post'},
          logout: { url: '/api/users/logout', method: 'post'}
        }
      }
    }
  },

  axios: {
    credentials: false,
    proxy: true
  },

  proxy: {
    "/api/": {
      target: "http://localhost:8080"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    middleware: ['auth']
  }
}
