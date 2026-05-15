import React from 'react'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const AdminHeader = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-between mb-8 max-w-[100vw]">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a2744]">{title}</h1>
          <p className="text-gray-500 text-sm md:text-base mt-1">{subtitle}</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="text-xs md:text-md inline-flex items-center gap-2 bg-[#c9a962] text-white px-4 py-2 rounded-lg hover:bg-[#b8944f] transition-colors"
        >
          <Plus className="h-5 w-5" />
          Dodaj Nekretninu
        </Link>
      </div>
  )
}
