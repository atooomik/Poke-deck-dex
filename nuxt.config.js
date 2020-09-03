const head = {
  title: process.env.npm_package_name || '',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: process.env.npm_package_description || '',
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
}

let css = [
  './assets/styles/base.scss',
  './assets/styles/components.scss',
  './assets/styles/utilities.scss',
]

let modules = ['@nuxtjs/tailwindcss']

const nuxtConfig = {
  mode: 'universal',
  buildModules: modules,
  head,
  css,
  plugins: [],
  watch: ['./tailwind.config.js'],
  build: {},
}

export default nuxtConfig
