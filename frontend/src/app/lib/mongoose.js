import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('MONGODB_URI nije definisan u .env.local');

let cached = global.mongoose ?? { conn: null, promise: null };  // ← ovo je bio problem, nedostajalo conn: null, promise: null

export async function connectDB() {
  if (cached.conn) return cached.conn;

  cached.promise ??= mongoose.connect(MONGODB_URI);
  cached.conn = await cached.promise;
  return cached.conn;
}