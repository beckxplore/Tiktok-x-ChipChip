/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background:    '#FFFFFF',
        surface:       '#FFFFFF',
        primary:       '#E53E3E',  // red
        secondary:     '#FFD700',  // gold
        'text-primary':'#1A202C',
        'text-secondary':'#4A5568',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '1rem',
      },
      boxShadow: {
        md: '0 4px 6px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}; 