import { useRouter } from 'next/router';

export default function DataStoriesSection({ reports = [] }) {
  const router = useRouter();
  const currentCategory = router.query.category || '';
  
  const categories = [
    {
      name: 'All Stories',
      slug: 'all'
    },
    {
      name: 'Enrolment barriers',
      slug: 'enrolment-barriers',
      taxonomy: 'report_category'
    },
    {
      name: 'Funding challenges',
      slug: 'funding-challenges',
      taxonomy: 'report_category'
    },
    {
      name: 'Gender',
      slug: 'gender',
      taxonomy: 'report_category'
    },
    {
      name: 'Policy/Regulatory gaps',
      slug: 'policy-regulatory',
      taxonomy: 'report_category'
    },
    {
      name: 'Service delivery',
      slug: 'service-delivery',
      taxonomy: 'report_category'
    }
  ];
  
  // Limit to 3 reports
  const displayReports = reports.slice(0, 3);
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <section className="py-20 bg-white">
      <div className="site-layout px-4 sm:px-6">
        <h2 className="text-4xl font-bold font-heading mb-8">Data and Stories</h2>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto pb-2">
          {categories.map((category) => (
            <a 
              key={category.slug}
              href={category.slug === 'all' ? '/' : `?category=${category.slug}`}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 whitespace-nowrap
                ${(currentCategory === category.slug || (category.slug === 'all' && !currentCategory)) 
                  ? 'border-2 border-[#0C8E61] text-gray-900 bg-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {category.name}
            </a>
          ))}
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayReports.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No stories found for this category.</p>
            </div>
          ) : (
            displayReports.map((report) => (
              <a key={report.id} href={report.link} className="block h-full">
                <article className="post-card h-full flex flex-col">
                  <div className="relative h-48 bg-gray-100">
                    <img 
                      src={report.featured_media ? report.featured_media : '/assets/images/fallback.png'}
                      alt={report.title?.rendered || ''}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="post-card-content flex-grow flex flex-col">
                    <h3 
                      className="post-card-title"
                      dangerouslySetInnerHTML={{ __html: report.title?.rendered }}
                    />
                    <div className="post-card-meta mt-auto">
                      <div className="post-card-date">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {formatDate(report.date)}
                      </div>
                    </div>
                    <div className="post-card-categories">
                      <span className="post-card-category green">
                        Story
                      </span>
                    </div>
                  </div>
                </article>
              </a>
            ))
          )}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <a 
            href={`https://inclusion-for-all.org/report/${currentCategory ? `?category=${currentCategory}` : ''}`}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#0C8E61] text-[#0C8E61] rounded-full hover:bg-[#0C8E61] hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            View All Stories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}