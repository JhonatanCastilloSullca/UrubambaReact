/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backAdmin: {
          light: '#FFFFFF',
          dark: '#0c1427',
        },
        secondBackAdmin: {
          light: '#f9fafb',
          dark: '#070d19',
        },
        textAdmin: {
          light: '#000000',
          dark: '#d0d6e1',
        },
        secondTextAdmin: {
          light: '#d0d6e1',
          dark: '#7987a1',
        },
        borderAdmin: {
          light: '#e9ecef',
          dark: '#172340',
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
  },
  plugins: [],
};
