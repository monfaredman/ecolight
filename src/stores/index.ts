import { createPinia } from 'pinia'
import { useAuthStore } from '@/modules/auth/models/index'

const pinia = createPinia()

export { pinia, useAuthStore }
