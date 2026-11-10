/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0d14',
          800: '#0f1422',
          700: '#161c30',
          600: '#1f2844',
          500: '#2b3658',
        },
        brand: {
          primary: '#6366f1', // Indigo
          secondary: '#8b5cf6', // Violet
          accent: '#06b6d4', // Cyan
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
