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
        'pulse-warn': 'pulse 0.8s ease-in-out infinite',
        'float-up': 'floatUp 0.8s ease-out forwards',
        'countdown': 'countdownPop 0.9s ease-out both',
      },
      keyframes: {
        countdownPop: {
          '0%': { opacity: '0', transform: 'scale(1.8)' },
          '25%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0.85', transform: 'scale(0.9)' },
        },
        floatUp: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-60px)' },
        },
      },
    },
  },
  plugins: [],
}
