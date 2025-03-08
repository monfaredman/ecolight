import tailwindcssRtl from 'tailwindcss-rtl'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/vuetify/**/*.mjs', // Add Vuetify compatibility
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6200ea', // Customize Vuetify colors to match Tailwind
      },
    },
  },
  plugins: [tailwindcssRtl()],
}
