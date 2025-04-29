import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/Layout';
import NewsletterSection from '../../components/NewsletterSection';
import ResourceCard from '../../components/resources/ResourceCard';
import { format, parseISO } from 'date-fns';

// Constants
const WP_API_URL = 'https://inclusion-for-all.org/wp-json/wp/v2';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [podcastAudio, setPodcastAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Fetch the post when the slug is available
  useEffect(() => {
    if (!slug) return;
    
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch the post by slug
        const response = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed=true`);
        
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        
        const posts = await response.json();
        
        if (posts.length === 0) {
          throw new Error('Post not found');
        }
        
        const post = posts[0];
        setPost(post);

        // Check if post is a podcast and extract audio URL
        if (isPodcast(post)) {
          const audioUrl = extractPodcastAudio(post);
          if (audioUrl) {
            setPodcastAudio(audioUrl);
          }
        }
        
        // Fetch related posts from the same category
        if (post._embedded?.['wp:term']?.[0]?.length > 0) {
          const category = post._embedded['wp:term'][0][0];
          const relatedResponse = await fetch(
            `${WP_API_URL}/posts?categories=${category.id}&exclude=${post.id}&per_page=3&_embed=true`
          );
          
          if (relatedResponse.ok) {
            const relatedPosts = await relatedResponse.json();
            setRelatedPosts(relatedPosts);
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);

  // Format date
  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  // Calculate read time (approximately 200 words per minute)
  const calculateReadTime = (content) => {
    if (!content) return 1;
    const strippedContent = content.replace(/<[^>]+>/g, ''); // Remove HTML tags
    const wordCount = strippedContent.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  // Function to check if post is a podcast
  const isPodcast = (post) => {
    if (!post || !post._embedded || !post._embedded['wp:term']) {
      return false;
    }
    
    // Check categories
    const categories = post._embedded['wp:term'][0] || [];
    const isPodcastCategory = categories.some(category => 
      category.name.toLowerCase().includes('podcast') || 
      category.slug.toLowerCase().includes('podcast')
    );
    
    // Also check post title or content for podcast indicators
    const titleHasPodcast = post.title?.rendered?.toLowerCase().includes('podcast');
    const contentHasPodcast = post.content?.rendered?.toLowerCase().includes('podcast') ||
                             post.content?.rendered?.includes('.mp3') ||
                             post.content?.rendered?.includes('<audio');
    
    return isPodcastCategory || titleHasPodcast || contentHasPodcast;
  };
  
  // Function to extract audio URL from post content
  const extractPodcastAudio = (post) => {
    if (!post?.content?.rendered || typeof window === 'undefined') {
      return null;
    }
    
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content.rendered, 'text/html');
      
      // Look for audio tags first
      const audioElements = doc.querySelectorAll('audio');
      if (audioElements.length > 0) {
        const sources = audioElements[0].querySelectorAll('source');
        if (sources.length > 0) {
          return sources[0].getAttribute('src');
        }
        return audioElements[0].getAttribute('src');
      }
      
      // Look for links to audio files
      const links = doc.querySelectorAll('a');
      for (let link of links) {
        const href = link.getAttribute('href');
        if (href?.match(/\.(mp3|wav|ogg|m4a)$/i)) {
          return href;
        }
      }
      
      // Check for direct audio URL pattern
      const audioUrlMatch = post.content.rendered.match(/<audio[^>]*src="([^"]+)"/);
      if (audioUrlMatch) {
        return audioUrlMatch[1];
      }
      
      // Check for ACF field
      return post.acf?.podcast_audio_url || null;
      
    } catch (error) {
      console.error('Error extracting podcast audio:', error);
      return null;
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="h-48 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Render error state
  if (error) {
    return (
      <Layout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">Error Loading Post</h1>
              <p className="text-base text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => router.back()} 
                className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors text-sm"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Render nothing if no post is loaded yet
  if (!post) return null;

  // Get featured image URL or fallback
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const imageUrl = featuredMedia?.source_url || '/assets/images/fallback.png';
  
  // Get category name
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const category = categories.length > 0 ? categories[0].name : 'Article';
  
  // Get tags
  const tags = post._embedded?.['wp:term']?.[1] || [];
  
  // Get read time
  const readTime = calculateReadTime(post.content?.rendered);

  return (
    <>
      <Head>
        <title>{post.title?.rendered || 'Blog Post'} - Inclusion For All</title>
        <meta 
          name="description" 
          content={post.excerpt?.rendered?.replace(/<[^>]+>/g, '').slice(0, 160) || 'Blog post from Inclusion For All'} 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <section className="bg-gray-50 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Category and Date */}
              <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-600">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {category}
                </span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {readTime} min read
                </span>
              </div>
              
              {/* Title */}
              <h1 
                className="text-2xl font-cormorant font-bold text-gray-900 mb-6"
                dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
              ></h1>
              
              {/* Author (if available) */}
              {post._embedded?.author && (
                <div className="flex items-center mb-6">
                  <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-300 mr-3">
                    <img 
                      src={post._embedded.author[0].avatar_urls?.['96'] || '/assets/images/default-avatar.png'} 
                      alt={post._embedded.author[0].name}
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{post._embedded.author[0].name}</p>
                    <p className="text-xs text-gray-600">{post._embedded.author[0].description?.slice(0, 50) || 'Author'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Featured Image */}
        <div className="max-w-7xl mx-auto px-4 -mt-4 mb-8">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
            <Image 
              src={imageUrl} 
              alt={featuredMedia?.alt_text || post.title?.rendered}
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
        </div>
        
        {/* Podcast Player */}
        {podcastAudio && (
          <div className="max-w-3xl mx-auto px-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow">
              <div className="flex items-center space-x-3 mb-4">
                <button 
                  onClick={togglePlayPause}
                  className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                  aria-label={isPlaying ? "Pause podcast" : "Play podcast"}
                >
                  {isPlaying ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  )}
                </button>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Listen to this Episode</h3>
                  <p className="text-xs text-gray-600">
                    {readTime} minute episode • {category}
                  </p>
                </div>
              </div>
              <audio 
                ref={audioRef}
                src={podcastAudio}
                className="w-full rounded-lg"
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          </div>
        )}
        
        {/* Content Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <article className="prose prose-sm max-w-none [&_img]:rounded-xl [&_video]:rounded-xl [&_iframe]:rounded-xl [&_video]:my-8 [&_iframe]:my-8 [&_video]:w-full [&_iframe]:w-full [&_video]:aspect-video [&_iframe]:aspect-video [&_video]:p-0 [&_iframe]:p-0">
                <div dangerouslySetInnerHTML={{ __html: post.content?.rendered }}></div>
              </article>
              
              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-xs font-medium text-gray-800 mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span 
                        key={tag.id} 
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Sharing Options */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-xs font-medium text-gray-800 mb-3">Share this article:</h3>
                <div className="flex space-x-3">
                  <button 
                    className="text-gray-500 hover:text-blue-600"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title.rendered)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    aria-label="Share on Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button 
                    className="text-gray-500 hover:text-blue-800"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    aria-label="Share on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button 
                    className="text-gray-500 hover:text-blue-600"
                    onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title.rendered)}`, '_blank')}
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button 
                    className="text-gray-500 hover:text-gray-800"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }}
                    aria-label="Copy link"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Read Next Section */}
        <section className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-cormorant font-bold text-gray-900 mb-6">Read Next</h2>
            
            {relatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {relatedPosts.map(relatedPost => {
                  // Get featured image URL or fallback
                  const relatedFeaturedMedia = relatedPost._embedded?.['wp:featuredmedia']?.[0];
                  const relatedImageUrl = relatedFeaturedMedia?.source_url || '/assets/images/fallback.png';
                  
                  // Get category name
                  const relatedCategories = relatedPost._embedded?.['wp:term']?.[0] || [];
                  const relatedCategory = relatedCategories.length > 0 ? relatedCategories[0].name : 'Article';
                  
                  // Get read time
                  const relatedReadTime = calculateReadTime(relatedPost.content?.rendered);
                  
                  return (
                    <ResourceCard
                      key={relatedPost.id}
                      title={relatedPost.title?.rendered || ''}
                      category={relatedCategory}
                      date={formatDate(relatedPost.date)}
                      readTime={relatedReadTime}
                      imageUrl={relatedImageUrl}
                      slug={relatedPost.slug}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 text-sm">No related posts found</div>
            )}
          </div>
        </section>

        <NewsletterSection />
      </main>
    </>
  );
}

BlogPost.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};