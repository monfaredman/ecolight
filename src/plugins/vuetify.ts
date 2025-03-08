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
    rtl: { en: false, ar: true },
  },
  theme: {
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
  defaults: {
    global: {
      // rtl: true, ❌ (Remove this, doesn't work)
    },
  },
})
