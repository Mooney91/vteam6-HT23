/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-gray': '#a1a1a1',
        'dark-gray': '#b6b6be',

        'light-bg': '#ffffff',
        'dark-bg': '#161618',

        'light-bg-alt': '#f7f7fa',
        'dark-bg-alt': '#1b1b1d',

        'light-fg': '#3e64ff',
        'dark-fg': '#8399f1',

        'light-neutral-fg': '#454a5e',
        'dark-neutral-fg': '#565e81',

        'light-theme-toggle': '#d4d4d4',
        'dark-theme-toggle': '#212121',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
    fontFamily: {
      Roboto: ['Roboto, sans-serif'],
      Karla: ['Karla, sans-serif'],
      Genos: ['Genos, sans-serif'],
      PlexMono: ['IBM Plex Mono,monospace'],
    },
    container: {
      padding: '2rem',
      center: true,
    },
    screens: {
      sm: '640px',
      md: '768px'
    }
  },
  plugins: [],
}

