/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // We will enforce dark mode
  theme: {
    extend: {
      colors: {
        bg: { 
          primary: '#030712', // Much darker, deep space
          secondary: '#0F172A', 
          card: '#111827', 
          elevated: '#1E293B',
          glow: '#0B132B'
        },
        accent: {
          indigo: '#6366F1', purple: '#A855F7', cyan: '#06B6D4',
          green: '#10B981', red: '#F43F5E', amber: '#F59E0B', pink: '#EC4899',
          emerald: '#059669', turquoise: '#14B8A6'
        },
        text: { primary: '#F8FAFC', secondary: '#94A3B8', muted: '#475569' },
        gradient: {
          start: 'rgba(255, 255, 255, 0.05)',
          end: 'rgba(255, 255, 255, 0.01)'
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'premium-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'premium-glow': 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        'specialty-card': 'linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
        
        // Specialty Gradients
        'grad-analgesics': 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
        'grad-cardio': 'linear-gradient(135deg, #FF0844 0%, #FFB199 100%)',
        'grad-endocrine': 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)',
        'grad-antibiotics': 'linear-gradient(135deg, #0BA360 0%, #3CBAB2 100%)',
        'grad-respiratory': 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
        'grad-cns': 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        'grad-derma': 'linear-gradient(135deg, #F77062 0%, #FE5196 100%)',
        'grad-urology': 'linear-gradient(135deg, #00C6FB 0%, #005BEA 100%)',
        'grad-hematology': 'linear-gradient(135deg, #870000 0%, #190A05 100%)',
        'grad-emergency': 'linear-gradient(135deg, #13547A 0%, #80D0C7 100%)',
        'grad-msk': 'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)',
        'grad-allergy': 'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
        'grad-vitamins': 'linear-gradient(135deg, #FDEB71 0%, #F8D800 100%)',
        'grad-oncology': 'linear-gradient(135deg, #B224EF 0%, #7579FF 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.2)',
        'glass-inner': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
        'glow-indigo': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
