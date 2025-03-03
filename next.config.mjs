/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-sidak.startcode.id",
      },
    ],
   
  },
};

export default nextConfig;
