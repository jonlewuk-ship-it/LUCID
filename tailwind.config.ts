import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        lucid: {
          void: '#06060E',
          deep: '#0A0A16',
          abyss: '#0E0E1E',
          surface: '#141428',
          panel: '#1A1A34',
          ghost: '#2A2A4A',
          ember: '#F0A830',
          kindle: '#E87840',
          warmth: '#E85D75',
          intelligence: '#5B8DEF',
          understanding: '#4AE8C4',
          communication: '#E8A838',
          appreciation: '#C45EDB',
          light: '#EDE6D6',
          mid: '#9A95AE',
          dim: '#5E587A',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
