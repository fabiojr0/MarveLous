/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
   extend: {
      colors: {
        'marvelYel': '#FFE500',
        'marvelRed': '#EC1D24',
      },
      spacing: {
        'myScreen': '500px',
        '6.5': '6.5rem',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'position': 'left, right'
      }
    }
  },
  plugins: [],
}