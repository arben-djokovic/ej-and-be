import React from 'react'
import { Shape } from './Shape'
import { Button } from './Button'
import { ArrowRight } from 'lucide-react'

export const FeaturedProperties = () => {
  return (
    <section className='px-10 py-20  flex flex-col gap-10'>
        <div className='font-serif flex flex-col items-center justify-center gap-2'>
            <div className="flex justify-center mb-3">
                <Shape />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Istaknute nekretnine</h2>
            <p className="text-center text-md md:text-lg">Izdvojene nekretnine sa našeg sajta</p>
        </div>
        
        <div>
        </div>

        <div className='flex items-center w-full justify-center'>
            <Button link="/nekretnine">
                <p className='text-sm flex gap-2 items-center px-3 py-2'>
                    Ucitaj više <ArrowRight className='h-5 w-5' />
                </p>
            </Button>
        </div>
    </section>
  )
}
