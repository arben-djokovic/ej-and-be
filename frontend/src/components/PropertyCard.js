import { Bath, Bed, MapPin, Maximize } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const PropertyCard = ({ property }) => {

  return (
        <Link href={`/properties/${property._id}`} className="block group text-gray-700">
      <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={property.images[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'} // fallback ako nema slika
            alt='Property'
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1.5 rounded-full text-sm font-semibold text-white bg-[#1a2744]`}
                // property.status === 'sale' ? 'bg-[#1a2744]' : 'bg-[#c9a962]'}
            >
              {property.status === 'sale' ? 'Prodaja' : 'Izdavanje'}
            </span>
          </div>

          {/* Price */}
          <div className="absolute bottom-4 left-4">
            <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-lg text-lg font-bold text-[#1a2744]">
              {property.price?.toLocaleString('hr-HR')}€
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 min-h-14 group-hover:text-[#c9a962] transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center gap-1 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              {property.address}, {property.city}
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4" />
              <span>{property.rooms}</span>
            </div>
           
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms || 1}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4" />
              <span>{property.area} m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
