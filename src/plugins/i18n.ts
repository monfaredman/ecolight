import { createI18n } from 'vue-i18n'

// Dynamically import all i18n files inside the modules folder
const modules = import.meta.glob('@/modules/**/i18n/index.ts', { eager: true })

const messages: Record<string, any> = {}

// Merge all translation files dynamically
for (const path in modules) {
  const module = modules[path] as Record<string, any>
  for (const locale in module) {
    if (!messages[locale]) {
      messages[locale] = {}
    }
    Object.assign(messages[locale], module[locale])
  }
}

// Initialize i18n
export const i18n = createI18n({
  legacy: false,
  locale: 'fa',
  fallbackLocale: 'fa',
  messages,
})
