import mongoose, { Schema } from 'mongoose';

// ─── Sub-schema za slike (čuvaju se u AWS S3) ────────────────────────────────
const ImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true, // AWS S3 URL
    },
    key: {
      type: String,
      required: true, // S3 object key (za brisanje iz S3 kad treba)
    },
    isPrimary: {
      type: Boolean,
      default: false, // jedna slika je "cover" / thumbnail
    }
  },
  { _id: true }
);

// ─── Glavni Property Schema ──────────────────────────────────────────────────
const PropertySchema = new Schema(
  {
    // ── Naslovi (3 jezika) ──────────────────────────────────────────────────
    title: { type: String, required: true, trim: true },       // Crnogorski (default)
    title_en: { type: String, trim: true, default: '' },       // Engleski
    title_tr: { type: String, trim: true, default: '' },       // Turski
    title_ru: { type: String, trim: true, default: '' },       // Ruski

    // ── Opisi (3 jezika) ───────────────────────────────────────────────────
    description: { type: String, default: '' },
    description_en: { type: String, default: '' },
    description_tr: { type: String, default: '' },
    description_ru: { type: String, default: '' },

    // ── Cijena i status ────────────────────────────────────────────────────
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['sale', 'rent', 'sold', 'rented'],
      default: 'sale',
    },

    // ── Tip nekretnine ─────────────────────────────────────────────────────
    type: {
      type: String,
      enum: ['apartment', 'house', 'villa', 'land', 'commercial', 'garage'],
      default: 'apartment',
    },

    // ── Lokacija ───────────────────────────────────────────────────────────
    city: {
      type: String,
      default: 'Podgorica',
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },

    // ── Karakteristike ─────────────────────────────────────────────────────
    area: {
      type: Number,
      min: 0,
      default: null, // m²
    },
    rooms: {
      type: Number,
      min: 0,
      default: null,
    },
    bathrooms: {
      type: Number,
      min: 0,
      default: null,
    },
    floor: {
      type: Number,
      default: null,
    },
    total_floors: {
      type: Number,
      min: 1,
      default: null,
    },
    year_built: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear() + 5,
      default: null,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    heating: {
      type: String,
      trim: true,
      default: '',
      // npr. 'central', 'electric', 'gas', 'underfloor', itd.
    },

    // ── Slike (AWS S3 URL-ovi) ─────────────────────────────────────────────
    images: {
      type: [ImageSchema],
      default: [],
    },

    // ── Meta / admin ───────────────────────────────────────────────────────
    featured: {
      type: Boolean,
      default: false, // istaknuta nekretnina na home page-u
    },
    isActive: {
      type: Boolean,
      default: true, // soft delete / skrivanje oglasa
    },

    // ── Opciono: vlasnik / agent (ako imaš User model) ─────────────────────
    // agent: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    // },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// ─── Indeksi za brže pretrage ────────────────────────────────────────────────
PropertySchema.index({ status: 1 });
PropertySchema.index({ type: 1 });
PropertySchema.index({ city: 1 });
PropertySchema.index({ featured: 1 });
PropertySchema.index({ price: 1 });
PropertySchema.index({ isActive: 1 });
// Full-text search po naslovu (sva 4 jezika)
PropertySchema.index({
  title: 'text',
  title_en: 'text',
  title_tr: 'text',
  title_ru: 'text',
});

// ─── Virtual: primarna slika ─────────────────────────────────────────────────
PropertySchema.virtual('primaryImage').get(function () {
  return (
    this.images.find((img) => img.isPrimary) ||
    this.images[0] ||
    null
  );
});

// ─── Export ──────────────────────────────────────────────────────────────────
export const Property =
  mongoose.models.Property || mongoose.model('Property', PropertySchema);