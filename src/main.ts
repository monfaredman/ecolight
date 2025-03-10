import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { pinia } from './stores/index'

import { i18n } from '@/plugins/i18n'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(vuetify)

app.mount('#app')
