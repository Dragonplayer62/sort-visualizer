module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.html',
    './src/**/*.svelte'
  ],
  darkmode: 'class', 
  theme: {
    extend: {
      spacing: {
        '88': '22rem',
        '84': '21rem',
      }
    },
  },
  plugins: [],
}
