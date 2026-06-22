"use client";
import React from "react";
import { Button } from "./Button";
import { RotateCcw, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export const PropertiesFilters = ({ params, setPage }) => {
  const router = useRouter();
  const [filters, setFilters] = React.useState({
    status: params.status || "all",
    type: params.type || "all",
    city: params.city || "all",
    rooms: params.rooms || "all",
    minPrice: params.minPrice || undefined,
    maxPrice: params.maxPrice || undefined,
  });
  const cities = ["Sarajevo", "Mostar", "Banja Luka", "Tuzla", "Zenica"];

  const handleReset = () => {
    setFilters({
      status: "all",
      type: "all",
      city: "all",
      rooms: "all",
      minPrice: undefined,
      maxPrice: undefined,
    });
    setPage(1);
    router.push("/properties");
  };

  const handleSearch = () => {
    let url = "/properties?";
    if (filters.status !== "all") url += `status=${filters.status}&`;
    if (filters.type !== "all") url += `type=${filters.type}&`;
    if (filters.city !== "all") url += `city=${filters.city}&`;
    if (filters.rooms !== "all") url += `rooms=${filters.rooms}&`;
    if (filters.minPrice) url += `minPrice=${filters.minPrice}&`;
    if (filters.maxPrice) url += `maxPrice=${filters.maxPrice}&`;
    setPage(1);
    router.push(url);
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#c9a962] focus:ring-[#c9a962]"
              >
                <option value="all">Sve</option>
                <option value="sale">Na prodaju</option>
                <option value="rent">Za iznajmljivanje</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tip nekretnine
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#c9a962] focus:ring-[#c9a962]"
              >
                <option value="all">Svi tipovi</option>
                <option value="apartment">Stan</option>
                <option value="house">Kuća</option>
                <option value="land">Zemljište</option>
                <option value="commercial">Komercijalna</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grad
              </label>
              <select
                value={filters.city}
                onChange={(e) =>
                  setFilters({ ...filters, city: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#c9a962] focus:ring-[#c9a962]"
              >
                <option value="all">Svi gradovi</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Rooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Struktura
              </label>
              <select
                value={filters.rooms}
                onChange={(e) =>
                  setFilters({ ...filters, rooms: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#c9a962] focus:ring-[#c9a962]"
              >
                <option value="all">Sve strukture</option>
                <option value="0">Garsonjera</option>
                <option value="1">Jednosoban</option>
                <option value="2">Dvosoban</option>
                <option value="3">Trosoban</option>
                <option value="4">Cetvorosoban</option>
                <option value="5">Petosoban</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cijena od
              </label>
              <input
                type="number"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
                placeholder="0"
                className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#c9a962] focus:ring-[#c9a962]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cijena do
              </label>
              <input
                type="number"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
                placeholder="∞"
                className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#c9a962] focus:ring-[#c9a962]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <div onClick={handleSearch} className="cursor-pointer shadow-lg border border-gray-200 rounded-lg gap-2 py-2 px-3 flex items-center text-sm hover:shadow-xl">
              <Search className="h-4 w-4" />
              Pretrazi
            </div>
            <Button variant="outline">
              <div onClick={handleReset} className="gap-2 py-2 px-3 flex items-center text-sm ">
                <RotateCcw className="h-4 w-4" />
                Resetuj
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
