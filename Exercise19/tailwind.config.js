/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: { 50: '#faf8ff', 100: '#f0ebff', 200: '#e3dbff', 600: '#8738e8', 700: '#762bd2' },
        ink: '#273043'
      },
      boxShadow: { card: '0 8px 24px rgba(40, 35, 71, 0.10)' },
      borderRadius: { panel: '1.125rem' }
    }
  },
  plugins: []
};
