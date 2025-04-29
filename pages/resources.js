import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import NewsletterSection from '../components/NewsletterSection';
import ResourceCard from '../components/resources/ResourceCard';
import OrganisationCard from '../components/resources/OrganisationCard';
import ResourceTabs from '../components/resources/ResourceTabs';
import HeaderTabs from '../components/resources/HeaderTabs';
import ResourceTypeNav from '../components/resources/ResourceTypeNav';
import FilterDropdown from '../components/resources/FilterDropdown';
import Pagination from '../components/resources/Pagination';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/router';

const POSTS_PER_PAGE = 6;
const WP_API_URL = 'https://inclusion-for-all.org/wp-json/wp/v2';
const WP_POSTS_ENDPOINT = `${WP_API_URL}/posts`;
const WP_POLICY_ENDPOINT = `${WP_API_URL}/policy`;
const WP_ORGANISATION_ENDPOINT = `${WP_API_URL}/organisation`;

// Organisation type options for dropdown
const ORGANISATION_TYPE_OPTIONS = [
  { value: 'all', label: '' },
  { value: 'ngo', label: 'NGO' },
  { value: 'financial-institution', label: 'Financial Institution' },
  { value: 'government', label: 'Government' },
  { value: 'education', label: 'Educational Institution' }
];

// Country options for dropdown
const COUNTRY_OPTIONS = [
  { value: 'all', label: '' },
  { value: 'nigeria', label: 'Nigeria' },
  { value: 'ghana', label: 'Ghana' },
  { value: 'kenya', label: 'Kenya' },
  { value: 'south-africa', label: 'South Africa' }
];

// Resource type options
const RESOURCE_TYPE_OPTIONS = [
  { value: 'all', label: '' },
  { value: 'policy', label: 'Policy' },
  { value: 'programme', label: 'Programme' },
  { value: 'report', label: 'Report' },
  { value: 'research', label: 'Research' }
];

// First, let's create a function to check if custom post types exist
const checkCustomPostTypes = async () => {
  try {
    // Try to get data from the WordPress API types endpoint
    const response = await fetch(`${WP_API_URL}/types`);
    const data = await response.json();
    
    // Check if policy post type exists
    const hasPolicyType = data?.policy !== undefined;
    const hasOrganisationType = data?.organisation !== undefined;
    
    return {
      hasPolicyType,
      hasOrganisationType
    };
  } catch (error) {
    console.error('Error checking custom post types:', error);
    return {
      hasPolicyType: false,
      hasOrganisationType: false
    };
  }
};

export default function Resources() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeMainTab, setActiveMainTab] = useState('internal');
  const [activeResourceType, setActiveResourceType] = useState('organisations');
  const [organisationType, setOrganisationType] = useState('all');
  const [resourceType, setResourceType] = useState('all');
  const [country, setCountry] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add a state variable for custom post types availability
  const [hasCustomPostTypes, setHasCustomPostTypes] = useState({
    policy: false,
    organisation: false
  });

  // Get the current page and other filters from the URL query params
  useEffect(() => {
    const page = router.query.page ? parseInt(router.query.page, 10) : 1;
    setCurrentPage(page);
    
    if (router.query.category) {
      setActiveCategory(router.query.category);
    }
    
    if (router.query.tab) {
      setActiveMainTab(router.query.tab);
    }
    
    if (router.query.type) {
      setActiveResourceType(router.query.type);
    }
    
    if (router.query.orgType) {
      setOrganisationType(router.query.orgType);
    }

    if (router.query.resourceType) {
      setResourceType(router.query.resourceType);
    }
    
    if (router.query.country) {
      setCountry(router.query.country);
    }
  }, [router.query]);

  // Check for custom post types when the component mounts
  useEffect(() => {
    const checkTypes = async () => {
      const { hasPolicyType, hasOrganisationType } = await checkCustomPostTypes();
      setHasCustomPostTypes({
        policy: hasPolicyType,
        organisation: hasOrganisationType
      });
    };
    
    checkTypes();
  }, []);

  useEffect(() => {
    if (activeMainTab === 'ecosystem') {
      // Fetch organisations for ecosystem view
      fetchOrganisations();
    } else {
      // Fetch posts for internal resources view
      fetchPosts();
    }
  }, [currentPage, activeCategory, activeMainTab, activeResourceType, organisationType, resourceType, country]);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Build query parameters
      const queryParams = new URLSearchParams({
        per_page: POSTS_PER_PAGE,
        page: currentPage,
        _embed: 'true' // Include featured media
      });
      
      // Add category filter if not 'all'
      if (activeCategory !== 'all') {
        // Note: In a real app, you'd likely have a mapping of category slugs to IDs
        // For example, if 'news' category has ID 5:
        // if (activeCategory === 'news') queryParams.append('categories', '5');
        
        // This is a simplified approach. Adjust based on your WordPress setup:
        if (activeCategory === 'news') queryParams.append('categories', '1');
        if (activeCategory === 'events') queryParams.append('categories', '2');
        if (activeCategory === 'knowledge') queryParams.append('categories', '3');
      }
      
      // Fetch posts from WordPress API
      const response = await fetch(`${WP_POSTS_ENDPOINT}?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
      
      // Get total posts and pages from headers
      const totalPostsHeader = response.headers.get('X-WP-Total');
      const totalPagesHeader = response.headers.get('X-WP-TotalPages');
      
      setTotalPosts(totalPostsHeader ? parseInt(totalPostsHeader, 10) : 0);
      setTotalPages(totalPagesHeader ? parseInt(totalPagesHeader, 10) : 0);
      setPosts(data);
      
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load resources. Please try again later.');
      setPosts([]);
      setTotalPosts(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrganisations = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let endpoint;
      let requestUrl;
      
      // Simplify the API requests to avoid parameter conflicts
      if (activeResourceType === 'organisations') {
        // For organizations section
        if (hasCustomPostTypes.organisation) {
          // If custom post type exists, use it
          endpoint = WP_ORGANISATION_ENDPOINT;
          const params = new URLSearchParams({
            per_page: POSTS_PER_PAGE,
            page: currentPage,
            _embed: 'true'
          });
          
          // Only add filters that are relevant to this endpoint
          if (organisationType !== 'all') {
            params.append('organisation_type', organisationType);
          }
          
          if (country !== 'all') {
            params.append('country', country);
          }
          
          requestUrl = `${endpoint}?${params.toString()}`;
        } else {
          // Fallback to regular posts filtered by category
          endpoint = WP_POSTS_ENDPOINT;
          const params = new URLSearchParams({
            per_page: POSTS_PER_PAGE,
            page: currentPage,
            _embed: 'true',
            categories: '35' // Category ID for organizations
          });
          
          // Add tag filtering if applicable
          if (organisationType !== 'all' || country !== 'all') {
            const tagIds = [];
            
            // Add organization type tag if selected
            if (organisationType === 'ngo') tagIds.push('101');
            else if (organisationType === 'financial-institution') tagIds.push('102');
            else if (organisationType === 'government') tagIds.push('103');
            else if (organisationType === 'education') tagIds.push('104');
            
            // Add country tag if selected
            if (country === 'nigeria') tagIds.push('201');
            else if (country === 'ghana') tagIds.push('202');
            else if (country === 'kenya') tagIds.push('203');
            else if (country === 'south-africa') tagIds.push('204');
            
            // If we have tag filters, add them to the request
            if (tagIds.length > 0) {
              params.append('tags', tagIds.join(','));
            }
          }
          
          requestUrl = `${endpoint}?${params.toString()}`;
        }
      } else {
        // For policies section
        if (hasCustomPostTypes.policy) {
          // If custom post type exists, use it
          endpoint = WP_POLICY_ENDPOINT;
          const params = new URLSearchParams({
            per_page: POSTS_PER_PAGE,
            page: currentPage,
            _embed: 'true'
          });
          
          // Only add filters that are relevant to this endpoint
          if (resourceType !== 'all') {
            params.append('resource_type', resourceType);
          }
          
          if (country !== 'all') {
            params.append('country', country);
          }
          
          requestUrl = `${endpoint}?${params.toString()}`;
        } else {
          // Fallback to regular posts filtered by category
          endpoint = WP_POSTS_ENDPOINT;
          const params = new URLSearchParams({
            per_page: POSTS_PER_PAGE,
            page: currentPage,
            _embed: 'true',
            categories: '37' // Category ID for policies
          });
          
          // Add tag filtering if applicable
          if (resourceType !== 'all' || country !== 'all') {
            const tagIds = [];
            
            // Add resource type tag if selected
            if (resourceType === 'policy') tagIds.push('301');
            else if (resourceType === 'programme') tagIds.push('302');
            else if (resourceType === 'report') tagIds.push('303');
            else if (resourceType === 'research') tagIds.push('304');
            
            // Add country tag if selected
            if (country === 'nigeria') tagIds.push('201');
            else if (country === 'ghana') tagIds.push('202');
            else if (country === 'kenya') tagIds.push('203');
            else if (country === 'south-africa') tagIds.push('204');
            
            // If we have tag filters, add them to the request
            if (tagIds.length > 0) {
              params.append('tags', tagIds.join(','));
            }
          }
          
          requestUrl = `${endpoint}?${params.toString()}`;
        }
      }
      
      console.log(`Fetching from: ${requestUrl}`);
      
      // Make the API request
      const response = await fetch(requestUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      
      const data = await response.json();
      
      // Get total items and pages from headers
      const totalItemsHeader = response.headers.get('X-WP-Total');
      const totalPagesHeader = response.headers.get('X-WP-TotalPages');
      
      setTotalPosts(totalItemsHeader ? parseInt(totalItemsHeader, 10) : 0);
      setTotalPages(totalPagesHeader ? parseInt(totalPagesHeader, 10) : 0);
      setOrganisations(data);
      
    } catch (err) {
      console.error('Error fetching ecosystem resources:', err);
      setError(`Failed to load ${activeResourceType}. Please try again later. Error: ${err.message}`);
      setOrganisations([]);
      setTotalPosts(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveCategory(tab);
    // Reset to first page and update URL
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, category: tab }
    }, undefined, { shallow: true });
  };

  const handleHeaderTabChange = (tab) => {
    setActiveMainTab(tab);
    // Reset to first page and update URL
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, tab }
    }, undefined, { shallow: true });
  };

  const handleOrganisationTypeChange = (type) => {
    setOrganisationType(type);
    // Reset to first page and update URL
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, orgType: type }
    }, undefined, { shallow: true });
  };

  const handleResourceTypeChange = (type) => {
    setResourceType(type);
    // Reset to first page and update URL
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, resourceType: type }
    }, undefined, { shallow: true });
  };

  const handleCountryChange = (selected) => {
    setCountry(selected);
    // Reset to first page and update URL
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, country: selected }
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

  // Render the resources content based on the active tab
  const renderResourcesContent = () => {
    if (activeMainTab === 'internal') {
      return (
        <>
          <ResourceTabs activeTab={activeCategory} onTabChange={handleTabChange} />
          
          <div className="border-b border-gray-100 mb-8"></div>

          {/* Results Count and Sort */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-gray-600">
              {!isLoading ? (
                totalPosts > 0 ? (
                  `Showing ${(currentPage - 1) * POSTS_PER_PAGE + 1}-${Math.min(currentPage * POSTS_PER_PAGE, totalPosts)} of ${totalPosts} Results`
                ) : (
                  "No results found"
                )
              ) : (
                "Loading results..."
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">SORT BY</span>
              <img 
                src="https://api.iconify.design/heroicons/chevron-down.svg?color=%23666666" 
                className="w-5 h-5" 
                alt="Sort"
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-600 text-center py-8 mb-8 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          {/* Resource Cards Grid */}
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
        </>
      );
    } else {
      // Ecosystem Resources View
      return (
        <>
          <ResourceTypeNav activeType={activeResourceType} />
          
          <div className="border-b border-gray-100 mb-8"></div>
          
          {/* Show currently selected type */}
          <div className="mb-6">
            <p className="text-gray-600">Showing: {activeResourceType === 'organisations' ? 'Organisations' : 'Policies & Programmes'}</p>
          </div>
          
          {/* Filters for Ecosystem View */}
          <div className="flex justify-end items-center gap-4 mb-8">
            <div className="text-gray-600 mr-auto">SORT BY:</div>
            
            {activeResourceType === 'organisations' ? (
              <FilterDropdown 
                label="ORGANISATION TYPE"
                options={ORGANISATION_TYPE_OPTIONS}
                value={organisationType}
                onChange={handleOrganisationTypeChange}
              />
            ) : (
              <FilterDropdown
                label="RESOURCE TYPE" 
                options={RESOURCE_TYPE_OPTIONS}
                value={resourceType}
                onChange={handleResourceTypeChange}
              />
            )}
            
            <FilterDropdown 
              label="BY COUNTRY"
              options={COUNTRY_OPTIONS}
              value={country}
              onChange={handleCountryChange}
            />
          </div>
          
          {/* Error message */}
          {error && (
            <div className="text-red-600 text-center py-8 mb-8 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
          
          {/* Organisation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading state
              [...Array(6)].map((_, index) => (
                <div key={index} className="col-span-1 bg-gray-100 rounded-lg animate-pulse h-64"></div>
              ))
            ) : organisations.length > 0 ? (
              // Organisations grid
              organisations.map(org => {
                // Extract required data from WordPress API response
                const title = org.title?.rendered || '';
                const slug = org.slug || '';
                const link = org.link || '';
                
                // Get featured image URL or fallback
                const featuredMedia = org._embedded?.['wp:featuredmedia']?.[0];
                const imageUrl = featuredMedia?.source_url || null;
                
                // Handle different data structures based on post type
                let category, country;
                
                if (activeResourceType === 'organisations') {
                  // For custom post type
                  if (hasCustomPostTypes.organisation) {
                    category = org.organisation_type || 'Organisation';
                    country = org.country || 'Nigeria';
                  } else {
                    // For regular posts with categories and tags
                    const categories = org._embedded?.['wp:term']?.[0] || [];
                    const tags = org._embedded?.['wp:term']?.[1] || [];
                    
                    category = categories.length > 0 ? categories[0].name : 'Organisation';
                    
                    // Find country tag
                    const countryTag = tags.find(tag => 
                      ['Nigeria', 'Ghana', 'Kenya', 'South Africa'].includes(tag.name)
                    );
                    country = countryTag ? countryTag.name : 'Nigeria';
                  }
                  
                  return (
                    <OrganisationCard
                      key={org.id}
                      title={title}
                      category={category}
                      country={country}
                      imageUrl={imageUrl}
                      slug={slug}
                    />
                  );
                } else {
                  // For policies & programmes
                  let resourceType;
                  
                  // Handle custom post type
                  if (hasCustomPostTypes.policy) {
                    resourceType = org.resource_type || 'Policy';
                  } else {
                    // For regular posts with categories and tags
                    const categories = org._embedded?.['wp:term']?.[0] || [];
                    const tags = org._embedded?.['wp:term']?.[1] || [];
                    
                    resourceType = tags.find(tag => 
                      ['Policy', 'Programme', 'Report', 'Research'].includes(tag.name)
                    )?.name || categories.length > 0 ? categories[0].name : 'Policy';
                  }
                  
                  const readTime = calculateReadTime(org.content?.rendered) || 3;
                  
                  return (
                    <ResourceCard
                      key={org.id}
                      title={title}
                      category={resourceType}
                      date={formatDate(org.date)}
                      readTime={readTime}
                      imageUrl={imageUrl}
                      slug={slug}
                    />
                  );
                }
              })
            ) : (
              // No results
              <div className="col-span-full text-center py-8 text-gray-600">No organisations found</div>
            )}
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Resource Centre - Inclusion For All</title>
        <meta name="description" content="Access our comprehensive collection of research, reports, and insights on financial inclusion in Nigeria." />
      </Head>

      <main>
        <HeroSection 
          title="Resource Centre" 
          bodyText="Access our comprehensive collection of research, reports, and insights on financial inclusion in Nigeria."
        />

        {/* Resource Content Section */}
        <section className="py-16 sm:py-20">
          <div className="site-layout px-4 sm:px-6">
            <HeaderTabs activeTab={activeMainTab} onTabChange={handleHeaderTabChange} />
            
            {renderResourcesContent()}

            {/* Pagination */}
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              baseUrl="/resources"
            />
          </div>
        </section>

        <NewsletterSection />
      </main>
    </>
  );
}

Resources.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};