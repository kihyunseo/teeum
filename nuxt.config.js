export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'front',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap',
      },
    ],
    script: [
      // 다음 주소 검색 API
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/reset.css',
    '@/assets/css/custom.css',
    '@/assets/scss/common.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/use.js',
    '@/plugins/filters.js',
    { src: '@/plugins/infiniteLoading.js', mode: 'client' },
    { src: '@/plugins/daumAddressSearch.js', mode: 'client' },
    { src: '@/plugins/quill.js', mode: 'client' },

    { src: '~plugins/iamport.js', ssr: false, injectAs: 'IMP' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '@/components', extensions: ['vue'] },
    { path: '@/components/common', extensions: ['vue'] },
    { path: '@/components/product', extensions: ['vue'] },
    { path: '@/components/header', extensions: ['vue'] },
    { path: '@/components/footer', extensions: ['vue'] },
    { path: '@/components/my', extensions: ['vue'] },
    { path: '@/components/community', extensions: ['vue'] },
    { path: '@/components/action', extensions: ['vue'] },
    { path: '@/components/chat', extensions: ['vue'] },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
  ],
  styleResources: {
    scss: ['@/assets/scss/*.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  script: [
    // 다음 주소 검색 API
    {
      src: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
    },
  ],
  server: {
    port: 8765,
  },
};
