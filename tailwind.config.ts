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
        teal:      { DEFAULT: '#1A8C8C', light: '#5DC6C6', pale: '#EBF7F7' },
        dark:      '#1a2a2a',
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
