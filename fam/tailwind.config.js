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
          primary: '#262626',
          secondary: '#833AB4',
          accent: '#E1306C',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#FAFAFA',
          card: '#FFFFFF',
        },
      },
      backgroundImage: {
        'ig-gradient': 'linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)',
        'gradient-brand': 'linear-gradient(45deg, #405DE6, #833AB4, #C13584, #E1306C)',
        'gradient-hero': 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(0, 0, 0, 0.06)',
        card: '0 8px 32px -8px rgba(0, 0, 0, 0.08)',
        glow: '0 0 40px -10px rgba(225, 48, 108, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
