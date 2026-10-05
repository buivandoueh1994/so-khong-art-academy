/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fffdf5',
          100: '#fffbe8',
          200: '#fef3c7',
          300: '#fde68a',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        cream: {
          50: '#fffdf9',
          100: '#fffbf0',
          200: '#fff6e0',
          300: '#feecb8',
        },
        charcoal: {
          900: '#18181b',
          800: '#27272a',
          700: '#3f3f46',
          600: '#52525b',
          500: '#71717a',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
        hand: ['"Patrick Hand"', '"Caveat"', 'cursive'],
      },
      boxShadow: {
        'warm': '0 10px 25px -5px rgba(234, 179, 8, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'warm-lg': '0 20px 30px -10px rgba(217, 119, 6, 0.2), 0 10px 15px -5px rgba(0, 0, 0, 0.04)',
        'doodle': '4px 4px 0px 0px rgba(24, 24, 27, 0.9)',
        'doodle-yellow': '4px 4px 0px 0px rgba(234, 179, 8, 0.9)',
      },
      borderRadius: {
        'organic': '255px 15px 225px 15px/15px 225px 15px 255px',
        'organic-alt': '18px 230px 20px 240px/220px 15px 240px 18px',
      }
    },
  },
  plugins: [],
}
