/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#262626',
          secondary: '#7c3aed',
          accent: '#6366f1',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#FAFAF9',
          card: '#FFFFFF',
        },
      },
      backgroundImage: {
        'ig-gradient': 'linear-gradient(135deg, #6366f1, #7c3aed)',
        'gradient-brand': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        'gradient-hero': 'linear-gradient(180deg, #050505 0%, #0a0a0a 100%)',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(0, 0, 0, 0.06)',
        card: '0 8px 32px -8px rgba(0, 0, 0, 0.08)',
        premium: '0 24px 48px -12px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
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
      },
    },
  },
  plugins: [],
};
