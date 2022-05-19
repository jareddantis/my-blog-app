const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['"Roboto Flex"', ...defaultTheme.fontFamily.sans],
      serif: ['Lora', ...defaultTheme.fontFamily.serif]
    }
  },
  plugins: [
    require('tailwindcss/colors'),
    require('@tailwindcss/typography')
  ]
}
