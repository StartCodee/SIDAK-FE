/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['localhost', 'api-sidak.startcode.id', '192.168.1.2'],
	},
};

export default nextConfig;
