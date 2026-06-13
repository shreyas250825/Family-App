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
          primary: '#4F46E5',
          secondary: '#8B5CF6',
          accent: '#F59E0B',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
          card: 'rgba(255, 255, 255, 0.85)',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 20%, #E0E7FF 60%, #EDE9FE 100%)',
        'gradient-hero': 'linear-gradient(180deg, #F8FAFF 0%, #F5F3FF 40%, #FFFBEB 100%)',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(79, 70, 229, 0.08)',
        card: '0 8px 32px -8px rgba(15, 23, 42, 0.08)',
        glow: '0 0 40px -10px rgba(139, 92, 246, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
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
