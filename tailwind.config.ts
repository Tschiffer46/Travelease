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
<<<<<<< HEAD
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        accent: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
=======
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
>>>>>>> copilot/create-ecommerce-website
      },
    },
  },
  plugins: [],
};

export default config;
