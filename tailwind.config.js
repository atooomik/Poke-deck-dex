/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    colors: {
      ui: {
        negative: '#333333',
        noir: '#242526',
        semiGray: 'rgba(226,232,240,0.5)',
        white: '#fff',
      },
      types: {
        grass: '#78C850',
        fire: '#F05030',
        water: '#3A98F8',
        bug: '#A8B820',
        poison: '#B050A0',
        psychic: '#F870A0',
        rock: '#B8A058',
        feary: '#FFB0FF',
        steel: '#A8A8C0',
        normal: '#A8A090',
        electric: '#F8D030',
        fighting: '#A05038',
        dragon: '#7060E0',
        ghost: '#6060B0',
        ice: '#58C8E0',
        dark: '#705848',
        ground: '#D0B058',
        fly: '#98A8F0',
      },
    },
    backgroundColor: (theme) => theme('colors'),
    spacing: {
      px: '1px',
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      48: '12rem',
      56: '14rem',
      64: '16rem',
      80: '20rem',
      88: '22rem',
      96: '24rem',
    },
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
    }),
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
