/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // blue-600
        'primary-foreground': '#F8FAFC', // slate-50
        
        // Secondary Colors
        'secondary': '#7C3AED', // violet-600
        'secondary-foreground': '#F8FAFC', // slate-50
        
        // Accent Colors
        'accent': '#F59E0B', // amber-500
        'accent-foreground': '#0F172A', // slate-900
        
        // Background Colors
        'background': '#0F172A', // slate-900
        'surface': '#1E293B', // slate-800
        
        // Text Colors
        'text-primary': '#F8FAFC', // slate-50
        'text-secondary': '#94A3B8', // slate-400
        
        // Status Colors
        'success': '#10B981', // emerald-500
        'success-foreground': '#F8FAFC', // slate-50
        'warning': '#F59E0B', // amber-500
        'warning-foreground': '#0F172A', // slate-900
        'error': '#EF4444', // red-500
        'error-foreground': '#F8FAFC', // slate-50
        
        // Border Colors
        'border': 'rgba(255, 255, 255, 0.1)',
        'border-hover': 'rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-semibold': '600',
        'heading-bold': '700',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'mono-normal': '400',
      },
      boxShadow: {
        'elevation': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'bounce-custom': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-smooth',
        'slide-up': 'slideUp 0.3s ease-smooth',
        'slide-down': 'slideDown 0.3s ease-smooth',
        'scale-in': 'scaleIn 0.2s ease-bounce-custom',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '150': '150',
        '200': '200',
        '210': '210',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}