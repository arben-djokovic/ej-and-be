'use client'
// app/not-found.js
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('Not_Found')
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium text-gray-400 tracking-widest mb-2">404</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{t('title')}</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        {t('subtitle')}
      </p>
      <Link
        href="/"
        className="py-2 px-5 bg-primary text-white rounded-lg hover:opacity-90"
      >
        {t('home_button')}
      </Link>
    </div>
  )
}