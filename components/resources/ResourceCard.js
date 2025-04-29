export default function ResourceCard({ title, category, date, readTime, imageUrl, slug, postType = 'posts' }) {
  // Build the link to the single post page
  const postLink = `/blog/${slug}`;
  
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white">
      <div className="aspect-h-5 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-72 relative">
        <img 
          src={imageUrl || "/assets/images/fallback.png"} 
          alt={title} 
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
          loading="lazy"
        />
        <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-green-50 px-2.5 py-1.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
          {category}
        </span>
      </div>
      <div className="flex flex-1 flex-col space-y-4 p-8">
        <h3 className="text-lg font-medium text-gray-900">
          <a href={postLink} className="hover:underline">
            <span aria-hidden="true" className="absolute inset-0"></span>
            {title}
          </a>
        </h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <img src="https://api.iconify.design/heroicons/calendar.svg?color=%23666666" className="w-4 h-4" alt="Calendar" />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <img src="https://api.iconify.design/heroicons/clock.svg?color=%23666666" className="w-4 h-4" alt="Clock" />
            {readTime} min read
          </span>
        </div>
      </div>
    </div>
  );
}