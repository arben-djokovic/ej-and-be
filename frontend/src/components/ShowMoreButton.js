'use client'
import { useTranslations } from 'next-intl';
import React from 'react'

export default function ShowMoreButton({ onClick, loading }) {
  const t = useTranslations("Properties");
  return (
    <div className='flex justify-center'>
      <button
        onClick={onClick}
        disabled={loading}
        className='py-1.5 px-5 bg-primary text-white rounded-lg cursor-pointer hover:opacity-90 disabled:opacity-50'
      >
        {loading ? t("loading") : t("show_more_button")}
      </button>
    </div>
  )
}