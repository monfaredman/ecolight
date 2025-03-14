import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { pinia } from './stores/index'

import { i18n } from '@/plugins/i18n'
import { createVuetify } from 'vuetify'

import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'

const vuetify = createVuetify()

const app = createApp(App)
app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(i18n)
app.component('DatePicker', Vue3PersianDatetimePicker)

app.mount('#app')
