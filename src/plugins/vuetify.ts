import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { lightTheme, darkTheme } from '@/styles/theme'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  locale: {
    locale: 'fa',
  },
  theme: {
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
})
