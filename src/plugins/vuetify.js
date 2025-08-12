import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#2196F3',
          secondary: '#757575',
          accent: '#000000',
          error: '#ff1744',
        },
      },
      dark: {
        colors: {
          primary: '#2196F3',
        },
      },
    },
  },
})
