import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Set Arial as the default font family for all text
    fontFamily: {
      sans: ['Arial', 'Helvetica', 'sans-serif'],
    },
    extend: {
      // Only your custom fonts
      fontFamily: {
        'league-gothic': ['var(--font-league-gothic)', 'League Gothic', 'Arial Black', 'sans-serif'],
        'alex-brush': ['var(--font-alex-brush)', 'Alex Brush', 'cursive'],
        'arial': ['Arial', 'Helvetica', 'sans-serif'],
      },
      // Your custom colors - direct hex values for maximum performance
      colors: {
        'penn-blue': '#101048',
        'syracuse-orange': '#B83800', // Darkened from #D14600 for better contrast (4.5:1 ratio)
        'steel-pink': '#B8159E', // Darkened from #DE1ACE for better contrast (4.5:1 ratio)
        'lavender-pink': '#FCADE7',
        'papaya-whip': '#FDF0DA',
        // Minimal shadcn variables - only what's actually used
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'primary': {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'accent': {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        'border': 'hsl(var(--border))',
        'input': 'hsl(var(--input))',
        'ring': 'hsl(var(--ring))',
        'muted': {
          foreground: 'hsl(var(--muted-foreground))',
        },
        'popover': {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
    },
  },
  // Keep tailwindcss-animate for shadcn/ui components
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- config file
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
