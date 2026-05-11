import { Footer } from '@/components/Footer'
import { Header } from '@/components/header/Header'
import { PageHeader } from '@/components/PageHeader'
import React from 'react'

export default function Contact() {
  return (<>
    <Header />
    <div>
        <PageHeader title="Kontakt" subtitle="Imate pitanja? Slobodno nas kontaktirajte" />
        <div className='h-screen'>
            <h1>aa</h1>
        </div>
    </div>
    <Footer />
  </>)
}
