import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        leather: {
          deep: '#3a2418',
          DEFAULT: '#6b4530',
          mid: '#8b6045',
          light: '#c4a17a',
        },
        gold: {
          DEFAULT: '#d4a85f',
          bright: '#e8c282',
          pale: '#f5e3c0',
          deep: '#b58939',
        },
        cream: { DEFAULT: '#faf2e6', soft: '#f3e8d4' },
        paper: { DEFAULT: '#fdf9f1', warm: '#fbf3e3' },
        ink: '#2a1c14',
        muted: { DEFAULT: '#8a7058', soft: '#b5a48d' },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      animation: {
        'spot-drift': 'spotDrift 18s ease-in-out infinite',
        'sheen': 'sheen 5s ease-in-out infinite',
        'cue-slide': 'cueSlide 2.4s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2.4s ease-in-out infinite',
        'draw-line': 'drawLine 1.6s cubic-bezier(.7,0,.3,1) 0.8s forwards',
      },
    },
  },
  plugins: [],
}
export default config
