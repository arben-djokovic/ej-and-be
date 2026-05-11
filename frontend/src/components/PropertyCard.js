import { Bath, Bed, MapPin, Maximize } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const PropertyCard = () => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const img = randomNumber % 2 === 0 ? "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop" : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
  return (
        <Link href={`/nekretnine/1`} className="block group text-gray-700">
      <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={img}
            alt='Property'
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1.5 rounded-full text-sm font-semibold text-white bg-[#1a2744]`}
                // property.status === 'sale' ? 'bg-[#1a2744]' : 'bg-[#c9a962]'}
            >
              Prodaja
            </span>
          </div>

          {/* Price */}
          <div className="absolute bottom-4 left-4">
            <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-lg text-lg font-bold text-[#1a2744]">
              150.000€
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 min-h-14 group-hover:text-[#c9a962] transition-colors">
            Luksuzan stan sa pogledom na more
          </h3>

          <div className="flex items-center gap-1 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              Bečići, Budva
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4" />
              <span>2</span>
            </div>
           
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              <span>1</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4" />
              <span>80 m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
