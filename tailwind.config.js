/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-medium': 'float 4.5s ease-in-out infinite',
        'float-fast': 'float 2.8s ease-in-out infinite',
        pulse: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'focus-ring': 'focus-ring 0.6s ease-in-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(1.13)' },
        },
        'focus-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(58, 123, 213, 0)' },
          '100%': { boxShadow: '0 0 8px 3px rgba(58, 123, 213, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}