import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import NewsletterSection from '../components/NewsletterSection';
import ResourceCard from '../components/resources/ResourceCard';
import Pagination from '../components/resources/Pagination';
import { format, parseISO } from 'date-fns';

// Constants
const POSTS_PER_PAGE = 6;
const WP_API_URL = 'https://inclusion-for-all.org/wp-json/wp/v2';

// Content type options
const CONTENT_TYPES = [
  { value: 'all', label: 'Everything' },
  { value: 'stories', label: 'Stories' },
  { value: 'data', label: 'Data' },
  { value: 'snapshots', label: 'Snapshots' },
  { value: 'facts', label: 'Key Facts' },
  { value: 'podcasts', label: 'Podcasts' }
];

// Theme options for filter
const THEMES = [
  { value: 'enrolment', label: 'Enrolment barriers' },
  { value: 'funding', label: 'Funding challenges' },
  { value: 'gender', label: 'Gender' },
  { value: 'policy', label: 'Policy/Regulatory gaps' },
  { value: 'service', label: 'Service delivery' }
];

// Media type options for filter
const MEDIA_TYPES = [
  { value: 'news', label: 'News' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'snapshot', label: 'Snapshot' },
  { value: 'story', label: 'Story' },
  { value: 'video', label: 'Video' },
  { value: 'all', label: 'All types' },
  { value: 'data', label: 'Data Visual' },
  { value: 'fact', label: 'Key Fact' }
];

export default function DataExplorer() {
  const router = useRouter();
  
  // State variables
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentType, setContentType] = useState('all');
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedMediaTypes, setSelectedMediaTypes] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get query parameters from URL
  useEffect(() => {
    if (!router.isReady) return;
    
    // Get page from URL
    const page = router.query.page ? parseInt(router.query.page, 10) : 1;
    setCurrentPage(page);
    
    // Get content type from URL
    if (router.query.type) {
      setContentType(router.query.type);
    }
    
    // Get themes from URL
    if (router.query.themes) {
      const themes = Array.isArray(router.query.themes) 
        ? router.query.themes 
        : router.query.themes.split(',');
      setSelectedThemes(themes);
    }
    
    // Get media types from URL
    if (router.query.media_types) {
      const mediaTypes = Array.isArray(router.query.media_types) 
        ? router.query.media_types 
        : router.query.media_types.split(',');
      setSelectedMediaTypes(mediaTypes);
    }
    
    // Get search from URL
    if (router.query.search) {
      setSearch(router.query.search);
    }
  }, [router.isReady, router.query]);

  // Fetch posts based on filters
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Build URL and parameters
        const params = new URLSearchParams({
          per_page: POSTS_PER_PAGE,
          page: currentPage,
          _embed: 'true'
        });

        // Apply theme filters using tags
        if (selectedThemes.length > 0) {
          const themeTags = [];
          selectedThemes.forEach(theme => {
            switch(theme) {
              case 'enrolment': themeTags.push('401'); break;
              case 'funding': themeTags.push('402'); break;
              case 'gender': themeTags.push('403'); break;
              case 'policy': themeTags.push('404'); break;
              case 'service': themeTags.push('405'); break;
            }
          });
          if (themeTags.length > 0) {
            params.append('tags', themeTags.join(','));
          }
        }
        
        // Apply media type filters using tags
        if (selectedMediaTypes.length > 0 && !selectedMediaTypes.includes('all')) {
          const mediaTypeTags = [];
          selectedMediaTypes.forEach(type => {
            switch(type) {
              case 'news': mediaTypeTags.push('501'); break;
              case 'podcast': mediaTypeTags.push('502'); break;
              case 'snapshot': mediaTypeTags.push('503'); break;
              case 'story': mediaTypeTags.push('504'); break;
              case 'video': mediaTypeTags.push('505'); break;
              case 'data': mediaTypeTags.push('506'); break;
              case 'fact': mediaTypeTags.push('507'); break;
            }
          });
          if (mediaTypeTags.length > 0) {
            params.append('tags', mediaTypeTags.join(','));
          }
        }
        
        // Add search parameter if provided
        if (search) {
          params.append('search', search);
        }
        
        // Make the API request
        const requestUrl = `${WP_API_URL}/posts?${params.toString()}`;
        console.log(`Fetching from: ${requestUrl}`);
        
        const response = await fetch(requestUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
        
        // Get total from headers
        const totalPostsHeader = response.headers.get('X-WP-Total');
        const totalPagesHeader = response.headers.get('X-WP-TotalPages');
        
        setTotalPosts(totalPostsHeader ? parseInt(totalPostsHeader, 10) : 0);
        setTotalPages(totalPagesHeader ? parseInt(totalPagesHeader, 10) : 0);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setPosts([]);
        setTotalPosts(0);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (router.isReady) {
      fetchPosts();
    }
  }, [router.isReady, currentPage, contentType, selectedThemes, selectedMediaTypes, search]);

  // Handler for content type tabs
  const handleContentTypeChange = (type) => {
    router.push({
      pathname: router.pathname,
      query: { 
        ...router.query, 
        type,
        page: 1 // Reset to first page
      }
    }, undefined, { shallow: true });
  };

  // Handler for form submission
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const themes = formData.getAll('themes');
    const mediaTypes = formData.getAll('media_types');
    
    // Update URL with filters
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: 1, // Reset to first page
        themes: themes.length > 0 ? themes.join(',') : undefined,
        media_types: mediaTypes.length > 0 ? mediaTypes.join(',') : undefined
      }
    }, undefined, { shallow: true });
  };

  // Handler for search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Get search query
    const searchQuery = e.target.search.value;
    
    // Update URL with search
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: 1, // Reset to first page
        search: searchQuery || undefined
      }
    }, undefined, { shallow: true });
  };

  // Handler to clear all filters
  const clearAllFilters = () => {
    router.push({
      pathname: router.pathname,
      query: {
        page: 1
      }
    }, undefined, { shallow: true });
  };

  // Format date helper function
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

  return (
    <>
      <Head>
        <title>Data Explorer - Inclusion For All</title>
        <meta 
          name="description" 
          content="Explore our comprehensive data and insights on financial inclusion in Nigeria through interactive visualizations and analysis."
        />
      </Head>

      <main>
        <HeroSection 
          title="Data Explorer" 
          bodyText="Explore our comprehensive data and insights on financial inclusion in Nigeria through interactive visualizations and analysis."
        />

        <section className="py-16 sm:py-20">
          <div className="site-layout px-4 sm:px-6">
            {/* Main Content Type Tabs */}
            <div className="flex flex-wrap gap-4 mb-8">
              {CONTENT_TYPES.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleContentTypeChange(value)}
                  className={`px-6 py-2 rounded-full transition ${
                    contentType === value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Filters Section */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Advanced Filters</h2>
                <div className="flex gap-4">
                  <button 
                    onClick={clearAllFilters}
                    className="text-green-600 hover:text-green-700 font-medium text-sm"
                  >
                    Clear all filters
                  </button>
                  <button 
                    type="submit" 
                    form="filterForm"
                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 text-sm font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>

              <form id="filterForm" className="space-y-6" onSubmit={handleFilterSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Theme Filter */}
                  <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Filter by theme
                    </label>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1">
                      <div className="space-y-3">
                        {THEMES.map(({ value, label }) => (
                          <div key={value} className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={`theme_${value}`} 
                              name="themes" 
                              value={value}
                              defaultChecked={selectedThemes.includes(value)}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`theme_${value}`} className="ml-3 text-sm text-gray-700">
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Media Type Filter */}
                  <div className="flex flex-col h-full">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Filter by media type
                    </label>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {MEDIA_TYPES.map(({ value, label }) => (
                          <div key={value} className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={`media_${value}`} 
                              name="media_types" 
                              value={value}
                              defaultChecked={selectedMediaTypes.includes(value)}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`media_${value}`} className="ml-3 text-sm text-gray-700">
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Results Count and Search */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-gray-600">
                {isLoading ? (
                  "Loading results..."
                ) : totalPosts > 0 ? (
                  `Showing ${(currentPage - 1) * POSTS_PER_PAGE + 1}-${Math.min(currentPage * POSTS_PER_PAGE, totalPosts)} of ${totalPosts} Results`
                ) : (
                  "No results found"
                )}
              </div>
              <div className="relative">
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input 
                    type="text" 
                    name="search" 
                    defaultValue={search}
                    placeholder="Search..." 
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red-600 text-center py-8 mb-8 bg-red-50 rounded-lg">
                Error loading data: {error}
              </div>
            )}

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                // Loading state
                [...Array(6)].map((_, index) => (
                  <div key={index} className="col-span-1 bg-gray-100 rounded-lg animate-pulse h-64"></div>
                ))
              ) : posts.length > 0 ? (
                // Posts grid
                posts.map(post => {
                  // Get featured image URL or fallback
                  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
                  const imageUrl = featuredMedia?.source_url || null;
                  
                  // Get category name
                  const categories = post._embedded?.['wp:term']?.[0] || [];
                  const category = categories.length > 0 ? categories[0].name : 'Article';
                  
                  // Calculate read time from content
                  const readTime = calculateReadTime(post.content?.rendered);
                  
                  return (
                    <ResourceCard
                      key={post.id}
                      title={post.title?.rendered || ''}
                      category={category}
                      date={formatDate(post.date)}
                      readTime={readTime}
                      imageUrl={imageUrl}
                      slug={post.slug}
                    />
                  );
                })
              ) : (
                // No results
                <div className="col-span-full text-center py-8 text-gray-600">No posts found</div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                baseUrl="/data-explorer"
              />
            )}
          </div>
        </section>

        <NewsletterSection />
      </main>
    </>
  );
}

DataExplorer.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};