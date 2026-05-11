/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#040B1F',
        surface: '#070F2B',
        accent: '#00C8FF',
        accent2: '#0057FF',
        gold: '#D4AF37',
        text: '#E8F0FF',
        muted: '#6B7FA3',
        glass: 'rgba(255,255,255,0.04)',
        border: 'rgba(255,255,255,0.08)',
        'border-glow': 'rgba(0,200,255,0.4)',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
