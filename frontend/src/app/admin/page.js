import { AdminHeader } from '@/components/admin/AdminHeader';
import { Building2, TrendingUp, Eye, Plus } from 'lucide-react'
import Link from 'next/link'
import { getDashboardData } from '../actions/PropertyActions';

export default async function AdminDashboard() {
    let data
  try {
    data = await getDashboardData()
  } catch (error) {
    throw error
  }
  const { totalProperties, totalSales, totalRentals, recentProperties, featuredProperties } = data;

  const stats = [
    { label: 'Ukupno Nekretnina', value: totalProperties || 0, icon: Building2, color: 'bg-blue-500' },
    { label: 'Na Prodaju', value: totalSales || 0, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Za Izdavanje', value: totalRentals || 0, icon: Eye, color: 'bg-purple-500' },
    { label: 'Istaknute', value: featuredProperties.length || 0, icon: Plus, color: 'bg-[#c9a962]' },
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE').format(price) + ' EUR'
  }

  const formatDate = (date) => {
    console.log('formatDate input:', date);
    return new Date(date).toLocaleDateString('sr-Latn-ME', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
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
      commercial: 'Poslovni prostor'
    }
    return types[type] || type
  }


  return (
    <div>
      <AdminHeader title="Dashboard" subtitle="Pregled statistika i nedavno dodatih nekretnina" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          console.log(recentProperties[0]);
          return (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#1a2744]">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Properties */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1a2744]">Nedavno Dodato</h2>
            <Link
              href="/admin/properties"
              className="text-[#c9a962] hover:underline text-sm font-medium"
            >
              Vidi sve
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {recentProperties && recentProperties.length > 0 ? (
            recentProperties.map((property) => (
              <Link
                key={property._id}
                href={`/admin/properties/${property._id}`}
                className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h3 className="font-semibold text-[#1a2744]">{property.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {getTypeText(property.type)} - {property.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#1a2744]">{formatPrice(property.price)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(property.status)}`}>
                      {getStatusText(property.status)}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {formatDate(property.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nema nekretnina</p>
              <Link
                href="/admin/properties/new"
                className="text-[#c9a962] hover:underline mt-2 inline-block"
              >
                Dodaj prvu nekretninu
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
