/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Add paths that should be statically generated
  exportPathMap: async function () {
    // Fetch blog posts from WordPress API
    const res = await fetch('https://inclusion-for-all.org/wp-json/wp/v2/posts');
    const posts = await res.json();

    // Create path map object with default routes
    const paths = {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/resources': { page: '/resources' },
      '/data-explorer': { page: '/data-explorer' },
      '/404': { page: '/404' },
    };

    // Add dynamic blog post routes
    posts.forEach(post => {
      paths[`/blog/${post.slug}`] = { page: '/blog/[slug]', query: { slug: post.slug } };
    });

    return paths;
  },
};

module.exports = nextConfig;