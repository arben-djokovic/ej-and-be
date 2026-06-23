import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['me', 'en', 'tr', 'ru'],
  defaultLocale: 'me',
  localePrefix: 'as-needed',
  localeDetection: false,
})