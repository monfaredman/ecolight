import tailwindcssRtl from 'tailwindcss-rtl'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/vuetify/**/*.mjs', // Add Vuetify compatibility
  ],
  plugins: [tailwindcssRtl()],
}
