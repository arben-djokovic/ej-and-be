"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Upload, Loader2 } from "lucide-react";
import { createProperty, updateProperty } from "@/app/actions/PropertyActions";
import { getPresignedUploadUrl, deleteS3Image } from "@/app/actions/UploadActions";
import { cities } from "@/proxy";

export function PropertyForm({ property, mode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");


  const [images, setImages] = useState(
    (property?.images || []).map((img) => ({ ...img, isNew: false }))
  );

  const [imagesToDelete, setImagesToDelete] = useState([]);

  const [formData, setFormData] = useState({
    title: property?.title || "",
    title_en: property?.title_en || "",
    title_tr: property?.title_tr || "",
    title_ru: property?.title_ru || "",
    description: property?.description || "",
    description_en: property?.description_en || "",
    description_tr: property?.description_tr || "",
    description_ru: property?.description_ru || "",
    price: property?.price?.toString() || "",
    status: property?.status || "sale",
    type: property?.type || "apartment",
    city: property?.city || "Podgorica",
    address: property?.address || "",
    area: property?.area?.toString() || "",
    rooms: property?.rooms?.toString() || "",
    bathrooms: property?.bathrooms?.toString() || "",
    floor: property?.floor?.toString() || "",
    total_floors: property?.total_floors?.toString() || "",
    year_built: property?.year_built?.toString() || "",
    parking: property?.parking || false,
    heating: property?.heating || "",
    featured: property?.featured || false,
  });

  const handleAddImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setImages((prev) => [
      ...prev,
      {
        url: preview,
        file,
        isNew: true,
        isPrimary: prev.length === 0,
      },
    ]);

    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    const img = images[index];

    if (!img.isNew && img.key) {
      setImagesToDelete((prev) => [...prev, img.key]);
    }

    if (img.isNew && img.url?.startsWith("blob:")) {
      URL.revokeObjectURL(img.url);
    }

    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length > 0 && !updated.some((i) => i.isPrimary)) {
        updated[0] = { ...updated[0], isPrimary: true };
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      setUploading(true);

      const finalImages = [];
      for (const img of images) {
        if (img.isNew && img.file) {
          const { uploadUrl, publicUrl, key } = await getPresignedUploadUrl(
            img.file.type
          );

          const res = await fetch(uploadUrl, {
            method: "PUT",
            body: img.file,
            headers: { "Content-Type": img.file.type },
          });

          if (!res.ok) throw new Error("Upload slike nije uspio");

          if (img.url?.startsWith("blob:")) {
            URL.revokeObjectURL(img.url);
          }

          finalImages.push({ url: publicUrl, key, isPrimary: img.isPrimary });
        } else {
          finalImages.push({
            url: img.url,
            key: img.key,
            isPrimary: img.isPrimary,
          });
        }
      }

      setUploading(false);

      const propertyData = {
        title: formData.title,
        title_en: formData.title_en || null,
        title_tr: formData.title_tr || null,
        title_ru: formData.title_ru || null,
        description: formData.description,
        description_en: formData.description_en || null,
        description_tr: formData.description_tr || null,
        description_ru: formData.description_ru || null,
        price: parseFloat(formData.price),
        status: formData.status,
        type: formData.type,
        city: formData.city,
        address: formData.address || null,
        area: parseFloat(formData.area),
        rooms: formData.rooms ? parseInt(formData.rooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        floor: formData.floor ? parseInt(formData.floor) : null,
        total_floors: formData.total_floors
          ? parseInt(formData.total_floors)
          : null,
        year_built: formData.year_built
          ? parseInt(formData.year_built)
          : null,
        parking: formData.parking,
        heating: formData.heating || null,
        images: finalImages,
        featured: formData.featured,
      };

      let actionResponse;
      if (mode === "create") {
        actionResponse = await createProperty(propertyData);
      } else {
        actionResponse = await updateProperty(property._id, propertyData);
      }

      if (!actionResponse.success) {
        alert(
          "Greska prilikom cuvanja nekretnine: " +
            (actionResponse.error || "Neznana greska")
        );
        return;
      }

      // 2. Tek nakon uspjesnog cuvanja nekretnine, obrisi stare slike sa S3
      if (imagesToDelete.length > 0) {
        const results = await Promise.allSettled(
          imagesToDelete.map((key) => deleteS3Image(key))
        );
        results.forEach((r, i) => {
          if (r.status === "rejected" || !r.value?.success) {
            console.error("Nije obrisana S3 slika:", imagesToDelete[i]);
          }
        });
      }

      if (mode === "create" && actionResponse.property?._id) {
        router.push("/properties/" + actionResponse.property._id);
      } else {
        router.push("/admin/properties/");
      }
    } catch (err) {
      alert(
        "Doslo je do greske prilikom cuvanja nekretnine. Molimo pokusajte ponovo."
      );
      console.error("Error saving property:", err);
      setError(err instanceof Error ? err.message : "Greska prilikom cuvanja");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-[#1a2744] mb-6">
          Osnovne Informacije
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Naziv (Crnogorski) *
            </label>
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="npr. Luksuzan stan u centru Podgorice"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Naziv (Engleski)
            </label>
            <input
              value={formData.title_en}
              onChange={(e) =>
                setFormData({ ...formData, title_en: e.target.value })
              }
              placeholder="Luxury apartment in Podgorica center"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Naziv (Turski)
            </label>
            <input
              value={formData.title_tr}
              onChange={(e) =>
                setFormData({ ...formData, title_tr: e.target.value })
              }
              placeholder="Podgorica merkezinde luks daire"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Naziv (Ruski)
            </label>
            <input
              value={formData.title_ru}
              onChange={(e) =>
                setFormData({ ...formData, title_ru: e.target.value })
              }
              placeholder="Роскошная квартира в центре Подгорицы"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cijena (EUR) *
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="150000"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
              required
            >
              <option value="sale">Prodaja</option>
              <option value="rent">Izdavanje</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tip Nekretnine *
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
              required
            >
              <option value="apartment">Stan</option>
              <option value="house">Kuca</option>
              <option value="land">Plac</option>
              <option value="commercial">Poslovni prostor</option>
              <option value="villa">Vila</option>
              <option value="garage">Garaza</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grad *
            </label>
            <select
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
              required
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresa
            </label>
            <input
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="npr. Ulica Slobode 15"
              required
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-[#1a2744] mb-6">Opis</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opis (Crnogorski) *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Detaljni opis nekretnine..."
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opis (Engleski)
            </label>
            <textarea
              value={formData.description_en}
              onChange={(e) =>
                setFormData({ ...formData, description_en: e.target.value })
              }
              placeholder="Detailed property description..."
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opis (Turski)
            </label>
            <textarea
              value={formData.description_tr}
              onChange={(e) =>
                setFormData({ ...formData, description_tr: e.target.value })
              }
              placeholder="Detayli mulk aciklamasi..."
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opis (Ruski)
            </label>
            <textarea
              value={formData.description_ru}
              onChange={(e) =>
                setFormData({ ...formData, description_ru: e.target.value })
              }
              placeholder="Подробное описание недвижимости..."
              rows={4}
              required
            />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-[#1a2744] mb-6">Detalji</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Povrsina (m²) *
            </label>
            <input
              type="number"
              value={formData.area}
              onChange={(e) =>
                setFormData({ ...formData, area: e.target.value })
              }
              placeholder="85"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Broj Soba
            </label>
            <input
              type="number"
              value={formData.rooms}
              onChange={(e) =>
                setFormData({ ...formData, rooms: e.target.value })
              }
              placeholder="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Broj Kupatila
            </label>
            <input
              type="number"
              value={formData.bathrooms}
              onChange={(e) =>
                setFormData({ ...formData, bathrooms: e.target.value })
              }
              placeholder="2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sprat
            </label>
            <input
              type="number"
              value={formData.floor}
              onChange={(e) =>
                setFormData({ ...formData, floor: e.target.value })
              }
              placeholder="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ukupno Spratova
            </label>
            <input
              type="number"
              value={formData.total_floors}
              onChange={(e) =>
                setFormData({ ...formData, total_floors: e.target.value })
              }
              placeholder="5"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Godina Izgradnje
            </label>
            <input
              type="number"
              value={formData.year_built}
              onChange={(e) =>
                setFormData({ ...formData, year_built: e.target.value })
              }
              placeholder="2020"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grijanje
            </label>
            <input
              value={formData.heating}
              onChange={(e) =>
                setFormData({ ...formData, heating: e.target.value })
              }
              placeholder="Centralno"
              required
            />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.parking}
                onChange={(e) =>
                  setFormData({ ...formData, parking: e.target.checked })
                }
                className="w-5 h-5 rounded border-gray-300 text-[#c9a962] focus:ring-[#c9a962]"
              />
              <span className="text-sm font-medium text-gray-700">
                Parking
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-[#1a2744] mb-6">Slike</h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <label
              htmlFor="fileInput"
              className="gap-2 flex items-center border border-gray-300 text-gray-600 hover:bg-gray-100 rounded-md px-4 py-2 cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              Dodaj
            </label>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleAddImage}
              className="hidden"
            />
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div key={img.key || img.url} className="relative group">
                  <img
                    src={img.url}
                    alt={`Slika ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {img.isPrimary && (
                    <span className="absolute bottom-2 left-2 px-2 py-1 bg-[#c9a962] text-white text-xs rounded">
                      Glavna
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Featured */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) =>
              setFormData({ ...formData, featured: e.target.checked })
            }
            className="w-5 h-5 rounded border-gray-300 text-[#c9a962] focus:ring-[#c9a962]"
          />
          <div>
            <span className="text-sm font-medium text-gray-700">
              Istaknuta Nekretnina
            </span>
            <p className="text-sm text-gray-500">
              Prikazi na pocetnoj stranici
            </p>
          </div>
        </label>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-4">
        <button type="button" variant="outline" onClick={() => router.back()}>
          Otkazi
        </button>
        <button
          type="submit"
          disabled={loading || uploading}
          className="bg-[#c9a962] hover:bg-[#b8944f] text-white gap-2 py-1 px-2 rounded-md"
        >
          {(loading || uploading) && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          {uploading
            ? "Otpremanje slika..."
            : mode === "create"
            ? "Dodaj Nekretninu"
            : "Sacuvaj Izmjene"}
        </button>
      </div>
    </form>
  );
}