/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeFonts: true,
  },
  images: {
    domains: ['inclusion-for-all.org'],
  },
  // Ensure trailing slashes for better static hosting compatibility
  trailingSlash: true,
  // Enable static export
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/' },
      '/404': { page: '/404' },
    };
  },
};

module.exports = nextConfig; 