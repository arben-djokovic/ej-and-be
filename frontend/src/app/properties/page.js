import { Footer } from '@/components/Footer'
import { Header } from '@/components/header/Header'
import { PageHeader } from '@/components/PageHeader'
import ShowProperties from '@/components/properties/ShowProperties'
import { getProperties } from '@/app/actions/PropertyActions'

export default async function Properties({ searchParams }) {
  const params = await searchParams;
  const res = await getProperties({ page: 1, status: params.status, type: params.type, city: params.city, rooms: params.rooms, minPrice: params.minPrice, maxPrice: params.maxPrice });
  const initialProperties = res.properties;
  const hasMore = res.hasMore;
  return (<>
    <Header />
    <div>
        <PageHeader title="Nekretnine" subtitle="Pregledajte naše dostupne nekretnine" />
        <div className='mb-10'>
          <ShowProperties params={params} initialProperties={initialProperties} hasMore={hasMore} />
        </div>
    </div>
    <Footer />
  </>)
}