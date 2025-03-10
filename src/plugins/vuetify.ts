import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { darkTheme } from '@/styles/theme'
import { fa } from 'vuetify/locale'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  locale: {
    locale: 'fa',
    fallback: 'fa',
    messages: { fa },
    rtl: {
      customLocale: true,
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#A16EA4',
          accent: '#82b1ff',
          error: '#dc3545',
          info: '#17a2b8',
          success: '#28a745',
          warning: '#d39e00',
          anchor: '#007185',
          background: '#F5F5F5',
        },
      },
      dark: darkTheme,
    },
  },
})
