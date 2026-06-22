"use client";
import React from "react";
import { PropertiesFilters } from "../PropertiesFilters";
import { PropertyCard } from "../PropertyCard";
import ShowMoreButton from "../ShowMoreButton";
import { getProperties } from "@/app/actions/PropertyActions";

export default function ShowProperties({ initialProperties, hasMore }) {
  const [properties, setProperties] = React.useState(initialProperties);
  const [hasMoreState, setHasMoreState] = React.useState(hasMore);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    const res = await getProperties({ page: nextPage });
    setProperties(res.properties);
    setHasMoreState(res.hasMore);
    setPage(nextPage);
    setLoading(false);
  };

  return (
    <>
      <PropertiesFilters />
      <section className="pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </section>
      {hasMoreState && <ShowMoreButton onClick={loadMore} loading={loading} />}
    </>
  );
}