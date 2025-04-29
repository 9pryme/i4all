import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Pagination({ currentPage, totalPages, baseUrl = '' }) {
  const router = useRouter();

  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  // Helper function to add or update the page parameter in a URL
  const addPageToUrl = (url, page) => {
    // Create a new URLSearchParams object from the current router query
    const query = new URLSearchParams(router.query);
    query.set('page', page.toString());
    
    return `${url || ''}?${query.toString()}`;
  };

  // Generate page numbers with smart ellipsis
  const renderPageNumbers = () => {
    const pages = [];
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= 2 || // Always show first two pages
        i > totalPages - 2 || // Always show last two pages
        (i >= currentPage - 1 && i <= currentPage + 1) // Show current page and neighbors
      ) {
        const pageUrl = addPageToUrl(baseUrl, i);
        pages.push(
          <Link 
            key={i}
            href={pageUrl}
            className={`w-8 h-8 flex items-center justify-center rounded-lg ${
              i === currentPage 
                ? 'bg-primary-green text-white pointer-events-none' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            aria-current={i === currentPage ? 'page' : undefined}
          >
            {i}
          </Link>
        );
      } else if (
        (i === 3 && currentPage > 4) || // Show ellipsis after page 2
        (i === totalPages - 2 && currentPage < totalPages - 3) // Show ellipsis before last 2 pages
      ) {
        pages.push(
          <span key={`ellipsis-${i}`} className="text-gray-400" aria-hidden="true">...</span>
        );
      }
    }
    
    return pages;
  };

  // URLs for previous and next buttons
  const prevPageUrl = currentPage > 1 ? addPageToUrl(baseUrl, currentPage - 1) : '#';
  const nextPageUrl = currentPage < totalPages ? addPageToUrl(baseUrl, currentPage + 1) : '#';

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* Previous Button */}
      <Link 
        href={prevPageUrl}
        className={`p-2 rounded-lg hover:bg-gray-100 ${
          currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''
        }`}
        aria-disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <img 
          src="https://api.iconify.design/heroicons/chevron-left.svg?color=%23666666" 
          className="w-5 h-5" 
          alt="Previous"
        />
      </Link>

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      <Link 
        href={nextPageUrl}
        className={`p-2 rounded-lg hover:bg-gray-100 ${
          currentPage >= totalPages ? 'opacity-50 pointer-events-none' : ''
        }`}
        aria-disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <img 
          src="https://api.iconify.design/heroicons/chevron-right.svg?color=%23666666" 
          className="w-5 h-5" 
          alt="Next"
        />
      </Link>
    </div>
  );
} 