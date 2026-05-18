import React from 'react'
import { Shape } from './Shape'
import { Button } from './Button'
import { ArrowRight } from 'lucide-react'
import { PropertyCard } from './PropertyCard'
import { getFeaturedProperties } from '@/app/actions/PropertyActions'

export const FeaturedProperties = async () => {
    const properties = await getFeaturedProperties();
  return (
    <section className='px-10 py-20  flex flex-col gap-10'>
        <div className='font-serif flex flex-col items-center justify-center gap-2'>
            <div className="flex justify-center mb-3">
                <Shape />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Istaknute nekretnine</h2>
            <p className="text-center text-md md:text-lg">Izdvojene nekretnine sa našeg sajta</p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {properties.map((property) => (<PropertyCard key={property._id} property={property} />))}
        </div>

        <div className='flex items-center w-full justify-center'>
            <Button link="/properties">
                <p className='text-sm flex gap-2 items-center px-3 py-2'>
                    Pogledaj više <ArrowRight className='h-5 w-5' />
                </p>
            </Button>
        </div>
    </section>
  )
}
