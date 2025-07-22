/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          500: '#0070F3',
          600: '#0056CC',
          700: '#004299'
        },
        secondary: {
          50: '#FFF8E6',
          100: '#FFF0CC',
          500: '#FFB800',
          600: '#E6A600',
          700: '#CC9500'
        },
        accent: {
          50: '#E8F5E8',
          100: '#D1EBD1',
          500: '#4CAF50',
          600: '#45A049',
          700: '#3D8B40'
        },
        background: '#F9FAFB',
        surface: '#FFFFFF',
        error: '#E53E3E',
        text: {
          primary: '#1A202C',
          secondary: '#4A5568'
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      fontSize: {
        'h1': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'h2': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }]
      },
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px'
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px'
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.05)',
        'md': '0 4px 6px rgba(0,0,0,0.1)',
        'lg': '0 10px 15px rgba(0,0,0,0.15)'
      },
      minHeight: {
        'touch': '48px'
      }
    },
  },
  plugins: [],
} 