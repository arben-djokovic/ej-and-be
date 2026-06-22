import { Header } from '@/components/header/Header'
import { Footer } from '@/components/Footer'
import { PropertyDetailView } from '@/components/PropertyDetailView'
import { getPropertyById } from '@/app/actions/PropertyActions'
import { notFound } from 'next/navigation'



export default async function PropertyDetailPage({ params }) {
  const { id } = await params

  let property
  try {
    property = await getPropertyById(id)
  } catch (error) {
    notFound()
  }

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <PropertyDetailView property={property} />
      </main>
      <Footer />
    </div>
  )
}
