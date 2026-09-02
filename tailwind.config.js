/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#131316',
          950: '#08080A',
          900: '#0E0E11',
          800: '#151519',
          700: '#1D1E22',
          600: '#2A2B31',
          500: '#3C3E45',
          400: '#5C5F68',
          300: '#8A8D96',
          200: '#B7B9C0',
        },
        ivory: {
          DEFAULT: '#F7F4EE',
          50: '#FDFCFA',
          100: '#F7F4EE',
          200: '#EFEAE0',
          300: '#E3DCCE',
          400: '#D2C8B5',
        },
        gold: {
          DEFAULT: '#C2A16B',
          50: '#F8F2E7',
          100: '#EEE1C8',
          200: '#DFCCA4',
          300: '#CFB585',
          400: '#C2A16B',
          500: '#A88750',
          600: '#8B6C3B',
          700: '#6B522B',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,16,20,0.04), 0 12px 32px -18px rgba(16,16,20,0.28)',
        lift: '0 2px 4px rgba(16,16,20,0.05), 0 28px 60px -28px rgba(16,16,20,0.42)',
        modal: '0 40px 120px -32px rgba(8,8,10,0.55)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'translateY(12px) scale(0.985)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-down': 'slide-down 0.28s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [],
};
