import { format } from 'date-fns';

export default function PostCard({ post }) {
  // Format the date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  // Get featured image URL or use fallback
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/assets/images/fallback.png';

  return (
    <a href={post.link} className="block h-full">
      <article className="post-card h-full flex flex-col">
        <div className="relative h-48 bg-gray-100">
          <img 
            src={imageUrl}
            alt={post.title?.rendered || 'Post Image'}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="post-card-content flex-grow flex flex-col">
          <h3 
            className="post-card-title"
            dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
          />
          <div 
            className="post-card-excerpt flex-grow"
            style={{ WebkitLineClamp: 2 }}
            dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }}
          />
          <div className="post-card-meta mt-auto">
            <div className="post-card-date">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {post.date && formatDate(post.date)}
            </div>
          </div>
          {post.categories && (
            <div className="post-card-categories">
              <span className="post-card-category green">
                Article
              </span>
            </div>
          )}
        </div>
      </article>
    </a>
  );
}