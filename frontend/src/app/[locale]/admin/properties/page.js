import { getProperties } from '@/app/actions/PropertyActions'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { DeletePropertyButton } from '@/components/admin/DeletePropertyButton'
import { Building2, Plus, Pencil, Eye } from 'lucide-react'
import Link from 'next/link'

export default async function AdminPropertiesPage() {
  let properties = []

  try{
    const response = await getProperties({ page: 1000 }) ;
    properties = response.properties || [];
  }catch(err){
    throw err
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE').format(price) + ' EUR'
  }

  const getStatusBadge = (status) => {
    return status === 'sale' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-blue-100 text-blue-800'
  }

  const getStatusText = (status) => {
    return status === 'sale' ? 'Prodaja' : 'Izdavanje'
  }

  const getTypeText = (type) => {
    const types = {
      apartment: 'Stan',
      house: 'Kuca',
      land: 'Plac',
      commercial: 'Poslovni prostor',
      villa: 'Vila'
    }
    return types[type] || type
  }

  return (
    <div>
      <AdminHeader title="Nekretnine" subtitle="Pregled svih nekretnina u sistemu" />

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {properties && properties.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Nekretnina</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Tip</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Grad</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Cijena</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Akcije</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((property) => (
                <tr key={property?._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {property?.images && property?.images[0] ? (
                        <img
                          src={property?.images[0].url}
                          alt={property?.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-[#1a2744]">{property?.title}</p>
                        <p className="text-sm text-gray-500">{property?.area} m²</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{getTypeText(property?.type)}</td>
                  <td className="px-6 py-4 text-gray-600">{property?.city}</td>
                  <td className="px-6 py-4 font-semibold text-[#1a2744]">{formatPrice(property?.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(property?.status)}`}>
                      {getStatusText(property?.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/properties/${property?._id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Pogledaj"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <Link
                        href={`/admin/properties/${property?._id}`}
                        className="p-2 text-gray-400 hover:text-[#c9a962] hover:bg-amber-50 rounded-lg transition-colors"
                        title="Izmijeni"
                      >
                        <Pencil className="h-5 w-5" />
                      </Link>
                      <DeletePropertyButton propertyId={property?._id} propertyTitle={property?.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="mb-4">Nema nekretnina</p>
            <Link
              href="/admin/nekretnine/nova"
              className="inline-flex items-center gap-2 bg-[#c9a962] text-white px-4 py-2 rounded-lg hover:bg-[#b8944f] transition-colors"
            >
              <Plus className="h-5 w-5" />
              Dodaj prvu nekretninu
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
