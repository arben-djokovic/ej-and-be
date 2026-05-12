import { Header } from '@/components/header/Header'
import { Footer } from '@/components/Footer'
import { PropertyDetailView } from '@/components/PropertyDetailView'

export default function PropertyDetailPage() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <PropertyDetailView />
      </main>
      <Footer />
    </div>
  )
}
