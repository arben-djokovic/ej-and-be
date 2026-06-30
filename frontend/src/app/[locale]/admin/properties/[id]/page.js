import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { PropertyForm } from '@/components/admin/PropertyForm'
import { getPropertyById } from '@/app/actions/PropertyActions'

export default async function AdminPropertyPage({ params }) {
  const { id } = await params
  const mode = id === 'new' ? 'create' : 'edit'

  let property
  if (mode === 'edit') {
    try{
      property = await getPropertyById(id)
    }catch(err){
      return notFound()
    }
  }

  if (mode === 'edit' && !property) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1a2744] transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Nazad na listu
        </Link>
        <h1 className="text-3xl font-bold text-[#1a2744]">{mode === 'create' ? 'Dodaj Nekretninu' : 'Izmijeni Nekretninu'}</h1>
        <p className="text-gray-500 mt-1">{property?.title}</p>
      </div>

      <PropertyForm property={property} mode={mode} />
    </div>
  )
}
