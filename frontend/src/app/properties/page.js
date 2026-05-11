import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/header/Header'
import { PageHeader } from '@/components/PageHeader'
import { PropertiesFilters } from '@/components/PropertiesFilters'
import { PropertyCard } from '@/components/PropertyCard'
import React from 'react'

export default function Properties() {
  return (<>
    <Header />
    <div>
        <PageHeader title="Nekretnine" subtitle="Pregledajte naše dostupne nekretnine" />
        <div className='mb-10'>
          <PropertiesFilters />
          <section className='pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4'>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <PropertyCard key={item} />
            ))}
          </section>
          <div className='flex justify-center'>
              <button className='py-1.5 px-5 bg-primary text-white rounded-lg cursor-pointer hover:opacity-90'>Prikaži više</button>
          </div>
        </div>
    </div>
    <Footer />
  </>)
}
