import { Footer } from '@/components/Footer'
import { Header } from '@/components/header/Header'
import { PageHeader } from '@/components/PageHeader'
import React from 'react'

export default function Properties() {
  return (<>
    <Header />
    <div>
        <PageHeader title="Nekretnine" subtitle="Pregledajte naše dostupne nekretnine" />
        <div className='h-screen'>
            <h1>aa</h1>
        </div>
    </div>
    <Footer />
  </>)
}
