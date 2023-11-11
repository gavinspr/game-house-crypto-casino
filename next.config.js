/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
		SUPABASE_API_URL: process.env.SUPABASE_API_URL,
		SUPABASE_PUBLIC_API_KEY: process.env.SUPABASE_PUBLIC_API_KEY
	}
};

module.exports = nextConfig;
