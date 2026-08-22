import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: '#0EA5D8', light: '#5DC6C6', pale: '#E0F4FB' },
        dark: '#1e2d3d',
        soft:      '#F7F8FA',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans:  ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
}

export default config
