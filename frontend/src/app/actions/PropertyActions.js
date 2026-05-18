'use server';

import { connectDB } from '@/app/lib/mongoose';
import { Property } from '@/app/models/Property';
import { revalidatePath } from 'next/cache';

// Dohvati sve
export async function getProperties() {
  await connectDB();
  const properties = await Property.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(properties)); // serialize za Next.js
}

// Dodaj novu
export async function createProperty(data) {
  await connectDB();
  const property = await Property.create(data);
  return { success: true, property: JSON.parse(JSON.stringify(property)) };
}

// Obrisi
export async function deleteProperty(id) {
  await connectDB();
  await Property.findByIdAndDelete(id);
  revalidatePath('/admin/properties');
  return { success: true };
}

// Update
export async function updateProperty(id, data) {
  await connectDB();
  await Property.findByIdAndUpdate(id, data);
  return { success: true };
}

export async function getPropertyById(id) {
  await connectDB();
  const property = await Property.findById(id).lean();
  if (!property) return null;
  return JSON.parse(JSON.stringify(property));
}

export async function getFeaturedProperties() {
  await connectDB();
  const properties = await Property.find({ featured: true }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(properties));
}

export async function getDashboardData(query) {
  await connectDB();
  const totalProperties = await Property.countDocuments();
  const totalSales = await Property.countDocuments({ status: 'sale' });
  const totalRentals = await Property.countDocuments({ status: 'rent' });
  const recentProperties = await Property.find().sort({ createdAt: -1 }).limit(3).lean();
  const featuredProperties = await Property.find({ featured: true }).sort({ createdAt: -1 }).lean();
  return {
    totalProperties,
    totalSales,
    totalRentals,
    recentProperties: JSON.parse(JSON.stringify(recentProperties)),
    featuredProperties: JSON.parse(JSON.stringify(featuredProperties)),
  };
}