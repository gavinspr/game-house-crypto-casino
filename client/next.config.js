/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
		SUPABASE_API_URL: process.env.SUPABASE_API_URL,
		SUPABASE_PUBLIC_API_KEY: process.env.SUPABASE_PUBLIC_API_KEY,
		IPFS_GATEWAY_BASE: process.env.IPFS_GATEWAY_BASE,
		IPFS_GATEWAY: process.env.IPFS_GATEWAY

	}, images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: process.env.IPFS_GATEWAY_BASE,
			},
		],
	},
};

module.exports = nextConfig;
