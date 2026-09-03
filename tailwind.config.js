/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mist: '#F5F5F7',
        surface: '#FFFFFF',
        ink: '#1D1D1F',
        muted: '#6E6E73',
        line: '#D2D2D7',
        appleBlue: '#0071E3',
        softBlue: '#EAF3FF',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
