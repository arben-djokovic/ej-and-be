# ej&be — Real Estate Website

A multilingual real estate website for listing apartments, houses, land, commercial spaces, villas and garages in Montenegro. It has a public property catalogue with filters and an admin panel for managing listings and uploading photos.

Built with **Next.js 16 (App Router)**, **React 19**, **MongoDB (Mongoose)** and **AWS S3**.

## Features

- **Multilingual UI** — Montenegrin (`me`, default), English, Turkish and Russian via [next-intl](https://next-intl-docs.vercel.app/), with localized listing titles and descriptions.
- **Property catalogue** — browse listings with filters for status (sale / rent), property type, city, number of rooms and price range, with "show more" pagination.
- **Property details** — individual listing pages with image gallery (Swiper).
- **Featured properties** and homepage sections (hero, stats, "why us").
- **Admin panel** (`/admin`):
  - Login with email and bcrypt-hashed password; session stored in a signed JWT in an `httpOnly` cookie (7 days).
  - Create, edit and delete listings.
  - Upload images directly to S3 through short-lived presigned URLs.
- Responsive layout with Tailwind CSS 4.

## Tech Stack

| Area        | Technology                                  |
|-------------|---------------------------------------------|
| Framework   | Next.js 16, React 19                        |
| Styling     | Tailwind CSS 4, Lucide icons                |
| i18n        | next-intl                                   |
| Database    | MongoDB with Mongoose                       |
| File storage| AWS S3 (`@aws-sdk/client-s3`)               |
| Auth        | bcryptjs (password hashing), jose (JWT)     |

## Project Structure

```
frontend/
├── messages/              # Translation files (me, en, tr, ru)
├── public/                # Static assets
└── src/
    ├── app/
    │   ├── [locale]/      # Localized pages (home, properties, about, contact, login, admin)
    │   ├── actions/       # Server actions: auth, properties, S3 uploads
    │   ├── lib/           # MongoDB connection, S3 client, JWT helpers
    │   └── models/        # Mongoose models (Property)
    ├── components/        # UI components (header, footer, admin, properties, ...)
    ├── i18n/              # next-intl routing and request config
    └── proxy.js           # Locale-routing middleware
```

## Getting Started

### Prerequisites

- Node.js 20.9 or newer (required by Next.js 16)
- A MongoDB database (local or MongoDB Atlas)
- An AWS S3 bucket for property images

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/ej-and-be.git
cd ej-and-be/frontend
npm install
```

### 2. Configure environment variables

Create a file named `.env.local` in the `frontend/` folder:

```env
# Database
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>

# Admin login
ADMIN_EMAIL=admin@example.com
# Bcrypt hash of the admin password (see below). Wrap in single quotes,
# because the value contains "$" characters.
ADMIN_PASSWORD_HASH='$2b$10$...'

# JWT signing secret — use a long random string (e.g. 64 random bytes, hex-encoded)
JWT_SECRET=replace-with-a-long-random-string

# AWS S3
AWS_REGION=eu-central-1
AWS_BUCKET_NAME=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key

# Optional: number of listings per page (default 3)
LIMIT=6
```

To generate the admin password hash:

```bash
node -e "require('bcryptjs').hash('your-admin-password', 10).then(console.log)"
```

> **Never commit `.env.local`.** It is already listed in `.gitignore`.

For S3, create an IAM user that has access **only** to your bucket, with `s3:PutObject` and `s3:DeleteObject` permissions on the `properties/*` prefix. The app serves images from public URLs, so the bucket must allow public read.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The admin panel is at `/admin` (log in at `/login`).

### Other scripts

```bash
npm run build   # Production build
npm run start   # Start the production server (run build first)
```

## Deployment

The app can be deployed to any platform that supports Next.js, such as Vercel. Add all variables from `.env.local` to the platform's environment settings. Do not upload the file itself.

## Known Limitations

- The contact form on `/contact` is a visual placeholder and does not send messages yet.

## License

Add a license of your choice here (for example MIT).
