/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#10B981',
        gray: {
          '50': '#F9FAFB',
          '100': '#F3F4F6',
          '200': '#E5E7EB',
          '300': '#D1D5DB',
          '400': '#9CA3AF',
          '500': '#6B7280',
          '600': '#4B5563',
          '700': '#374151',
          '800': '#1F2937',
          '900': '#111827',
        },
      },
      fontFamily: {
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.green.600'),
              '&:hover': {
                color: theme('colors.green.700'),
              },
            },
            h1: {
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: '700',
            },
            h2: {
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: '700',
            },
            h3: {
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: '600',
            },
            h4: {
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: theme('colors.green.500'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
  ],
} 