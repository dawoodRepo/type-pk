export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        light: {
          bg:      '#f1f5f9',
          surface: '#ffffff',
          border:  '#cbd5e1',
          text:    '#0f172a',
          subtext: '#475569',
        },
        dark: {
          bg:      '#0f172a',
          surface: '#1e293b',
          border:  '#334155',
          text:    '#f1f5f9',
          subtext: '#94a3b8',
        },
        typing: {
          correct: '#22c55e',
          error:   '#ef4444',
          cursor:  '#6366f1',
          untyped: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}