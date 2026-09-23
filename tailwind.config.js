/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#2B2118',
          50: '#F5EFE6',
          100: '#EAD9C7',
          200: '#D4B89A',
          300: '#BE976D',
          400: '#A87640',
          500: '#8A5E2E',
          600: '#6F4E37',
          700: '#4A3325',
          800: '#2B2118',
          900: '#17130F',
        },
        cream: {
          DEFAULT: '#F5EFE6',
          50: '#FAF9F6',
          100: '#F5EFE6',
          200: '#E8D9C4',
          300: '#D4B896',
          400: '#BF9868',
          500: '#AA7840',
        },
        coffee: {
          DEFAULT: '#6F4E37',
          light: '#8A6148',
          dark: '#4A3325',
        },
        sage: {
          DEFAULT: '#8A9A5B',
          light: '#A4B273',
          dark: '#6B7845',
        },
        accent: '#B88A5A',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(43, 33, 24, 0.08), 0 1px 2px -1px rgba(43, 33, 24, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(43, 33, 24, 0.1), 0 2px 4px -2px rgba(43, 33, 24, 0.06)',
        'modal': '0 20px 60px rgba(43, 33, 24, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
