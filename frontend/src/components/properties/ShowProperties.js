"use client";
import React from "react";
import { PropertiesFilters } from "../PropertiesFilters";
import { PropertyCard } from "../PropertyCard";
import ShowMoreButton from "../ShowMoreButton";
import { getProperties } from "@/app/actions/PropertyActions";

export default function ShowProperties({ initialProperties, hasMore, params }) {
  const [properties, setProperties] = React.useState(initialProperties);
  const [hasMoreState, setHasMoreState] = React.useState(hasMore);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const loadMore = async () => {
    try{
      setLoading(true);
      const nextPage = page + 1;
      const res = await getProperties({ page: nextPage, status: params.status, type: params.type, city: params.city, rooms: params.rooms, minPrice: params.minPrice, maxPrice: params.maxPrice });
      setProperties(res.properties);
      setHasMoreState(res.hasMore);
      setPage(nextPage);
      setLoading(false);
    }catch(err){
      setLoading(false);
      alert('Doslo je do greske prilikom ucitavanja dodatnih nekretnina. Molimo pokusajte ponovo.')
      console.error('Error loading more properties:', err)
    }
  };

  React.useEffect(() => {
    setProperties(initialProperties);
    setHasMoreState(hasMore);
    setPage(1);
  }, [initialProperties, hasMore]);
  
  return (
    <>
      <PropertiesFilters setPage={setPage} params={params} />
      <section className="pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </section>
      {hasMoreState && <ShowMoreButton onClick={loadMore} loading={loading} />}
    </>
  );
}