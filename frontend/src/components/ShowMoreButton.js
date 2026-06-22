'use client'
import React from 'react'

export default function ShowMoreButton({ onClick, loading }) {
  return (
    <div className='flex justify-center'>
      <button
        onClick={onClick}
        disabled={loading}
        className='py-1.5 px-5 bg-primary text-white rounded-lg cursor-pointer hover:opacity-90 disabled:opacity-50'
      >
        {loading ? 'Učitavanje...' : 'Prikaži više'}
      </button>
    </div>
  )
}