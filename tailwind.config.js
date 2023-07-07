/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
   extend: {
      spacing: {
        'myScreen': '500px',
      },
      transitionProperty: {
        'width': 'width',
        'position': 'left, right'
      }
    }
  },
  plugins: [],
}