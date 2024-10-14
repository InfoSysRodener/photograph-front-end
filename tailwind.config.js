/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1FAD9F',
      },
      fontFamily: {
        'work-sans': 'WorkSans',
      },
      width: {
        'calc-full-minus-250': 'calc(100% - 250px)',
      },
    },
  },
  plugins: [],
};
