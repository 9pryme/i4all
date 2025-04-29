import PostCard from './PostCard';

export default function PostsSection({ posts }) {
  // Only show first 3 posts
  const displayPosts = posts?.slice(0, 3);

  return (
    <section className="w-full" style={{ backgroundColor: '#FEC90C' }}>
      <style jsx>{`
        .view-all-posts {
          border: 2px solid #0C8E61;
          color: rgb(0, 0, 0);
          background-color: transparent;
          transition: all 0.3s ease;
        }
        .view-all-posts:hover {
          background-color: #0C8E61;
          color: white;
        }
      `}</style>
      <div className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="site-layout px-4 sm:px-6">
          <div className="mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 font-heading">Latest Insights</h2>
            <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-gray-600">Stay updated with our latest articles and research</p>
          </div>

          <div className="relative">
            <div className="overflow-x-visible pb-6 sm:pb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {displayPosts && displayPosts.length > 0 ? (
                  displayPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center py-6 sm:py-8 md:py-12">
                    <div className="text-center text-gray-600 bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
                      <div className="animate-spin mb-2 sm:mb-3 md:mb-4">⏳</div>
                      <p className="text-base sm:text-lg md:text-xl">Loading posts...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-6 sm:mt-8">
              <a href="/resources" className="view-all-posts inline-block font-semibold px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full">
                View All Posts
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}