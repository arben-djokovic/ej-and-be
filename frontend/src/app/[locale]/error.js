// app/error.js
'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function Error({ error, reset }) {
  const t = useTranslations('Error')
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium text-gray-400 tracking-widest mb-2">{t('title')}</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{t('subtitle')}</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        {t('description')}
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="py-2 px-5 bg-primary text-white rounded-lg hover:opacity-90"
        >
          {t('retry_button')}
        </button>
        <Link
          href="/"
          className="py-2 px-5 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          {t('home_button')}
        </Link>
      </div>
    </div>
  )
}