import { Building2, TrendingUp, Eye, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
    const totalProperties = 120;
    const forSale = 80;
    const forRent = 40;
    const featured = 15;
    const recentProperties = [
        { id: 1, title: 'Luksuzni Stan u Centru', type: 'apartment', city: 'Podgorica', price: 150000, status: 'sale', created_at: '2024-05-01' },
        { id: 2, title: 'Porodična Kuća sa Dvorištem', type: 'house', city: 'Nikšić', price: 200000, status: 'sale', created_at: '2024-05-03' },
        { id: 3, title: 'Poslovni Prostor u Blizini', type: 'commercial', city: 'Podgorica', price: 3000, status: 'rent', created_at: '2024-05-05' },
    ]
  const stats = [
    { label: 'Ukupno Nekretnina', value: totalProperties || 0, icon: Building2, color: 'bg-blue-500' },
    { label: 'Na Prodaju', value: forSale || 0, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Za Izdavanje', value: forRent || 0, icon: Eye, color: 'bg-purple-500' },
    { label: 'Istaknute', value: featured || 0, icon: Plus, color: 'bg-[#c9a962]' },
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE').format(price) + ' EUR'
  }

  const formatDate = (date) => {
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a2744]">Dashboard</h1>
          <p className="text-gray-500 mt-1">Pregled poslovanja</p>
        </div>
        <Link
          href="/admin/nekretnine/nova"
          className="inline-flex items-center gap-2 bg-[#c9a962] text-white px-4 py-2 rounded-lg hover:bg-[#b8944f] transition-colors"
        >
          <Plus className="h-5 w-5" />
          Dodaj Nekretninu
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
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
              href="/admin/nekretnine"
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
                key={property.id}
                href={`/admin/nekretnine/${property.id}`}
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
                      {formatDate(property.created_at)}
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
                href="/admin/nekretnine/nova"
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
