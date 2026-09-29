/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dream: {
          50: '#fff5f7',
          100: '#ffe4ea',
          200: '#fecdd8',
          300: '#fea3b7',
          400: '#fb7193',
          500: '#f43f6e',
          600: '#e11d53',
          700: '#be1241',
          800: '#9f133a',
          900: '#851435',
          950: '#4a0519',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        handwriting: ['Caveat', 'Dancing Script', 'cursive'],
        serif: ['Playfair Display', 'serif'],
        display: ['Cinzel Decorative', 'serif'],
      },
      boxShadow: {
        'glow-pink': '0 0 25px rgba(244, 63, 110, 0.35), 0 0 50px rgba(254, 163, 183, 0.2)',
        'glow-rose': '0 0 25px rgba(225, 29, 83, 0.25), 0 0 50px rgba(254, 205, 216, 0.4)',
        'glow-soft': '0 10px 30px -5px rgba(244, 63, 110, 0.15), 0 0 20px rgba(255, 255, 255, 0.8)',
        'polaroid': '0 15px 35px -5px rgba(136, 19, 55, 0.12), 0 0 15px rgba(254, 163, 183, 0.3)',
        'polaroid-hover': '0 25px 45px -8px rgba(136, 19, 55, 0.22), 0 0 30px rgba(244, 63, 110, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'spin-very-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        }
      }
    },
  },
  plugins: [],
}
