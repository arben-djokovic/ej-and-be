import { Footer } from '@/components/Footer'
import { Header } from '@/components/header/Header'
import { PageHeader } from '@/components/PageHeader'
import ShowProperties from '@/components/properties/ShowProperties'
import { getProperties } from '@/app/actions/PropertyActions'

export default async function Properties({ searchParams }) {
  let data;
  let initialProperties = []
  let hasMore = false
  const params = await searchParams;

  try{
    data = await getProperties({ page: 1, status: params.status, type: params.type, city: params.city, rooms: params.rooms, minPrice: params.minPrice, maxPrice: params.maxPrice });
    initialProperties = data.properties;
    hasMore = data.hasMore;
  }catch(err){
    throw err
  }
  
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