/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-sidak.startcode.id",
      },
    ],
    unoptimized: true, // Matikan optimasi gambar bawaan Next.js
  },
};

export default nextConfig;
