module.exports = {
  purge: [
    './src/**/*.{js,jsx}',
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: [
        'disabled'
      ]
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
