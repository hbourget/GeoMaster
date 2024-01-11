import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  strictTokens: true,

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        zIndex: {
          first: {
            value: 1,
          },
        },
        borderWidths: {
          1: {
            value: '1px',
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
