'use client'

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteProperty } from '@/app/actions/PropertyActions'


export function DeletePropertyButton({ propertyTitle, propertyId }) {
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    setShowConfirm(true)
    try{
      const res = await deleteProperty(propertyId)
      if(!res.success) throw new Error(res.error || 'Unknown error')
    }catch(error){
      alert('Doslo je do greske prilikom brisanja nekretnine. Molimo pokusajte ponovo.')
      console.error('Error deleting property:', error)
    }
  }

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
          <h3 className="text-lg font-bold text-[#1a2744] mb-2">Potvrda brisanja</h3>
          <p className="text-gray-600 mb-6">
            Da li ste sigurni da zelite da obrisete nekretninu &quot;{propertyTitle}&quot;? Ova akcija se ne moze ponistiti.
          </p>
          <div className="flex justify-end gap-3">
            <button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              disabled={loading}
            >
              Otkazi
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Obrisi
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="Obrisi"
    >
      <Trash2 className="h-5 w-5" />
    </button>
  )
}
