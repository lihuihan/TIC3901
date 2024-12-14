/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      sans: ['Roboto', 'sans-serif'],
    },
    gridTemplateColumns: {
      '70/30': '70% 28%',
    },
  },
  plugins: [],
}
