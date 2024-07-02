/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './assets/typescript/**/*.js',
      './index.html',
  ],
  theme: {
    extend: {
        colors: {
            primary: {
                DEFAULT: 'var(--gov-color-primary)',
                100: 'var(--gov-color-primary-100)',
                200: 'var(--gov-color-primary-200)',
                300: 'var(--gov-color-primary-300)',
                400: 'var(--gov-color-primary-400)',
                500: 'var(--gov-color-primary-500)',
                600: 'var(--gov-color-primary-600)',
                700: 'var(--gov-color-primary-700)',
                800: 'var(--gov-color-primary-800)',
                900: 'var(--gov-color-primary-900)',
            },
            secondary: {
                DEFAULT: 'var(--gov-color-secondary)',
                100: 'var(--gov-color-secondary-100)',
                200: 'var(--gov-color-secondary-200)',
                300: 'var(--gov-color-secondary-300)',
                400: 'var(--gov-color-secondary-400)',
                500: 'var(--gov-color-secondary-500)',
                600: 'var(--gov-color-secondary-600)',
                700: 'var(--gov-color-secondary-700)',
                800: 'var(--gov-color-secondary-800)',
                900: 'var(--gov-color-secondary-900)',
            },
            success: {
                DEFAULT: 'var(--gov-color-success)',
                100: 'var(--gov-color-success-100)',
                200: 'var(--gov-color-success-200)',
                300: 'var(--gov-color-success-300)',
                400: 'var(--gov-color-success-400)',
                500: 'var(--gov-color-success-500)',
                600: 'var(--gov-color-success-600)',
                700: 'var(--gov-color-success-700)'
            },
            warning: {
                DEFAULT: 'var(--gov-color-warning)',
                100: 'var(--gov-color-warning-100)',
                200: 'var(--gov-color-warning-200)',
                300: 'var(--gov-color-warning-300)',
                400: 'var(--gov-color-warning-400)',
                500: 'var(--gov-color-warning-500)',
                600: 'var(--gov-color-warning-600)',
                700: 'var(--gov-color-warning-700)'
            },
            error: {
                DEFAULT: 'var(--gov-color-error)',
                100: 'var(--gov-color-error-100)',
                200: 'var(--gov-color-error-200)',
                300: 'var(--gov-color-error-300)',
                400: 'var(--gov-color-error-400)',
                500: 'var(--gov-color-error-500)',
                600: 'var(--gov-color-error-600)'
            },
            neutral: {
              black: 'var(--gov-color-neutral-black)',
              white: 'var(--gov-color-neutral-white)',
            }
        },
        borderWidth: {
            3: '3px'
        }
    }
  },
  plugins: [],
}

