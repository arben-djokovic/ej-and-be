'use server';

import { connectDB } from '@/app/lib/mongoose';
import { Property } from '@/app/models/Property';
import { revalidatePath } from 'next/cache';
import mongoose from "mongoose";

//get limit from env
const LIMIT = parseInt(process.env.LIMIT) || 3;

// Dohvati sve
export async function getProperties({ page, limit = LIMIT, status, type, city, rooms, minPrice, maxPrice }) {
  const totalLimit = page * limit;
  await connectDB();
  const query = {};
  if (!!status && status !== "all") query.status = status;
  if (!!type && type !== "all") query.type = type;
  if (!!city && city !== "all") query.city = city;
  if (!!rooms && rooms !== "all") query.rooms = rooms;
  if (minPrice) query.price = { ...query.price, $gte: minPrice };
  if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
  
  const properties = await Property.find(query).sort({ createdAt: -1, _id: -1 }).limit(totalLimit).lean();
  const totalCount = await Property.find(query).countDocuments();
  const hasMore = totalCount > properties.length;
  return { properties: JSON.parse(JSON.stringify(properties)), hasMore }; // serialize za Next.js
}

// Dodaj novu
export async function createProperty(data) {
  try{
    await connectDB();
    const property = await Property.create(data);
    return { success: true, property: JSON.parse(JSON.stringify(property)) };
  }catch(err){
    console.error('Error creating property:', err);
    return { success: false, error: err.message };
  }
}

// Obrisi
export async function deleteProperty(id) {
  try{
    if(!id) return { success: false, error: 'ID is required' };
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
      await connectDB();
      await Property.findByIdAndDelete(id);
      revalidatePath('/admin/properties');
      return { success: true };
  }catch(err){
    console.error('Error deleting property:', err);
    return { success: false, error: err.message };
  }
}

// Update
export async function updateProperty(id, data) {
  try{
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    await connectDB();
    await Property.findByIdAndUpdate(id, data);
    return { success: true };
  }catch(err){
    console.error('Error updating property:', err);
    return { success: false, error: err.message };
  }
}

export async function getPropertyById(id) {
  try{
    if(!id) return null;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    await connectDB();
    const property = await Property.findById(id).lean();
    if (!property) return null;
    return JSON.parse(JSON.stringify(property));
  }catch(err){
    console.error('Error fetching property by ID:', err);
    return null;
  }
}

export async function getFeaturedProperties() {
  try{
    await connectDB();
    const properties = await Property.find({ featured: true }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(properties));
  }catch(err){
    console.error('Error fetching featured properties:', err);
    return [];
  }
}

export async function getDashboardData() {
  try{
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
  }catch(err){
    console.error('Error fetching dashboard data:', err);
    return {
      totalProperties: 0,
      totalSales: 0,
      totalRentals: 0,
      recentProperties: [],
      featuredProperties: [],
    };
  }
}