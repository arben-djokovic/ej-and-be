import { Footer } from '@/components/Footer'
import { Header } from '@/components/header/Header'
import { PageHeader } from '@/components/PageHeader'
import React from 'react'

export default function About() {
  return (<>
    <Header />
    <div>
        <PageHeader title="O nama" subtitle="Saznajte više o našoj priči i misiji" />
        <div className='h-screen'>
            <h1>aa</h1>
        </div>
    </div>
    <Footer />
  </>)
}
