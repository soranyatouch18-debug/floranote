/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF9',
          100: '#FAF5F1',
          200: '#F5EDE7', // Warm Cream primary
          300: '#EBDDD3',
          400: '#DFC8B8',
          500: '#CCAFA0',
        },
        dustyPink: {
          50: '#FCF5F6',
          100: '#F9EBEE',
          200: '#F2D3D8',
          300: '#E8B7BD', // Dusty Pink primary
          400: '#DA969E',
          500: '#C8747E',
          600: '#A8535E',
        },
        sage: {
          50: '#F4F6F2',
          100: '#E6EAE2',
          200: '#D2DBCB',
          300: '#B6C4AC',
          400: '#8D9B7A', // Sage Green primary
          500: '#738160',
          600: '#5A664A',
        },
        deepBrown: {
          50: '#F7F6F5',
          100: '#EBE9E7',
          200: '#D4D0CD',
          300: '#ADA6A1',
          400: '#7D736E',
          500: '#453A38', // Deep Brown primary
          600: '#3A302F',
          700: '#2E2625',
          800: '#231D1C',
          900: '#171212',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(69, 58, 56, 0.06)',
        'elevated': '0 16px 40px rgba(69, 58, 56, 0.10)',
        'glow': '0 0 25px rgba(232, 183, 189, 0.35)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
