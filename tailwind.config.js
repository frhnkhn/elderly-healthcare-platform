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
        primary: {
          DEFAULT: '#2D9CDB',
          50: '#EBF5FB',
          100: '#D0E9F7',
          200: '#A1D3EF',
          300: '#72BDE7',
          400: '#43A7DF',
          500: '#2D9CDB',
          600: '#1A7DB5',
          700: '#145E88',
          800: '#0D3F5B',
          900: '#07202E',
        },
        secondary: {
          DEFAULT: '#27AE60',
          50: '#E9F7EF',
          100: '#C9EDD8',
          200: '#93DBB1',
          300: '#5DC98A',
          400: '#3DB872',
          500: '#27AE60',
          600: '#1E8B4D',
          700: '#16683A',
          800: '#0E4527',
          900: '#072314',
        },
        background: '#F8FAFC',
        card: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 16px 0 rgba(45, 156, 219, 0.08)',
        'card-hover': '0 4px 24px 0 rgba(45, 156, 219, 0.18)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
