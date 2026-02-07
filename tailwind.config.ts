import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0f5',
          100: '#cce1eb',
          200: '#99c3d7',
          300: '#66a5c3',
          400: '#3387af',
          500: '#1B4965', // Deep ocean blue - main brand color
          600: '#163a51',
          700: '#102c3d',
          800: '#0b1d28',
          900: '#050f14',
        },
        accent: {
          50: '#fef7f0',
          100: '#fdefe1',
          200: '#fcdfc3',
          300: '#facfa5',
          400: '#f9bf87',
          500: '#DDA15E', // Warm sand/gold - accent color
          600: '#b1814b',
          700: '#856138',
          800: '#584025',
          900: '#2c2013',
        },
        background: {
          DEFAULT: '#FAFAF9', // Warm white
          secondary: '#F5F5F4', // Light warm gray
        },
        text: {
          DEFAULT: '#292524', // Rich dark charcoal
          secondary: '#57534E', // Medium charcoal
          tertiary: '#78716C', // Light charcoal
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
