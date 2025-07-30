/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        A1: {
          Forest: '#53705A',
          Cream: '#FFFAF2',
          Charcoal: '#161616',
          Ash: '#6C6C6C'
        }
      }
    }
  },
  plugins: [],
}