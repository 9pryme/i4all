import Head from 'next/head';

export default function Custom404() {
  return (
    <div className="site-layout px-4 sm:px-6 py-20">
      <Head>
        <title>Page Not Found - Inclusion For All</title>
        <meta name="description" content="The page you are looking for does not exist" />
      </Head>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h1 className="font-heading text-6xl font-bold text-gray-900 mb-6">
          404
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Oops! The page you are looking for cannot be found.
        </p>
        <a href="/" className="bg-primary-green text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors">
          Return Home
        </a>
      </div>
    </div>
  );
} 