import { Footer } from '@/components/Footer'
import { Header } from '@/components/header/Header'
import { PageHeader } from '@/components/PageHeader'
import ShowProperties from '@/components/properties/ShowProperties'
import { getProperties } from '@/app/actions/PropertyActions'

export default async function Properties() {
  const res = await getProperties({ page: 1 });
  const initialProperties = res.properties;
  const hasMore = res.hasMore;
  return (<>
    <Header />
    <div>
        <PageHeader title="Nekretnine" subtitle="Pregledajte naše dostupne nekretnine" />
        <div className='mb-10'>
          <ShowProperties initialProperties={initialProperties} hasMore={hasMore} />
        </div>
    </div>
    <Footer />
  </>)
}