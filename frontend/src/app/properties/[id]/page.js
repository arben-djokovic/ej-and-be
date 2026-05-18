import { Header } from '@/components/header/Header'
import { Footer } from '@/components/Footer'
import { PropertyDetailView } from '@/components/PropertyDetailView'
import { getPropertyById } from '@/app/actions/PropertyActions'



export default async function PropertyDetailPage({ params }) {
  const { id } = await params
  const property = await getPropertyById(id)

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
