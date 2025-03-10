import { createPinia } from 'pinia'
import { useAuthStore } from '@/modules/auth/store/index'

const pinia = createPinia()

export { pinia, useAuthStore }
