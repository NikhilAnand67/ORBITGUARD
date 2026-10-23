/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: process.env.NEXT_DIST_DIR || (process.env.NODE_ENV === "development" ? ".next-dev" : ".next"),
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "apod.nasa.gov", pathname: "/apod/image/**" },
			{ protocol: "https", hostname: "images-assets.nasa.gov", pathname: "/image/**" },
			{ protocol: "https", hostname: "science.nasa.gov", pathname: "/**" },
		],
	},
};

export default nextConfig;
