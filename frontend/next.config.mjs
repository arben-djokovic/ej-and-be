// add images.unsplash.com to next.config.mjs as allowed image domain

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
