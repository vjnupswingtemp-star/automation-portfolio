import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#FEFEFE',
        'near-black': '#111111',
        'ai-accent': '#5B5BFF',
        'y2k-yellow': '#FFE500',
        'sticker-red': '#FF6B6B',
        muted: '#AAAAAA',
        'light-gray': '#F7F7F7',
      },
      fontFamily: {
        display: ['var(--font-bricolage)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        // font-mono keeps Tailwind default monospace stack
      },
      lineHeight: {
        'display-tight': '1.05',
        'display-snug': '1.15',
      },
    },
  },
  plugins: [],
}

export default config
