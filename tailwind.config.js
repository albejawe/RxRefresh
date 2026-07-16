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
        bg: { primary: '#0A0E1A', secondary: '#111827', card: '#1A2233', elevated: '#1F2D40' },
        accent: {
          indigo: '#6366F1', purple: '#8B5CF6', cyan: '#06B6D4',
          green: '#10B981', red: '#EF4444', amber: '#F59E0B', pink: '#EC4899'
        },
        text: { primary: '#F9FAFB', secondary: '#9CA3AF', muted: '#6B7280' }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
