/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#2A2F3A',
          850: '#1A1D23',
        },
      },
    },
  },
  plugins: [],
};