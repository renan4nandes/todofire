module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'montserrat': 'Montserrat'
      },
    
      colors: {
        orange: '#FC9403'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
