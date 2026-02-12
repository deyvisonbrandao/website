/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
      },
      colors: {
        // Identidade Visual DHB: Preto, Branco, Cinza e Vermelho
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',  // Vermelho principal
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Cores inspiradas no site Ateliware para backgrounds modernos
        gradient: {
          'dark-start': '#0B1426',    // Azul escuro profundo
          'dark-middle': '#1A1D3A',   // Roxo escuro intermediário
          'dark-end': '#2D1B4E',      // Roxo mais claro
          'accent': '#6366F1',        // Índigo moderno
          'accent-light': '#818CF8',  // Índigo claro
        }
      },
      backgroundImage: {
        'gradient-ateliware': 'linear-gradient(135deg, #0B1426 0%, #1A1D3A 50%, #2D1B4E 100%)',
        'gradient-ateliware-light': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0B1426 0%, #1A1D3A 70%, #2D1B4E 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(11, 20, 38, 0.8) 0%, rgba(26, 29, 58, 0.9) 100%)',
        'gradient-primary': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.7s ease-out',
        'slide-in-right': 'slideInRight 0.7s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
