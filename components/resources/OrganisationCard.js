import React from 'react';

export default function OrganisationCard({ title, category, country, imageUrl, slug }) {
  // Build the link to the organisation page
  const orgLink = `/ecosystem/${slug}`;
  
  return (
    <div className="h-full overflow-hidden rounded-lg bg-white">
      <div className="h-48 w-full bg-gray-100">
        <img 
          src={imageUrl || "/assets/images/fallback.png"} 
          alt={title} 
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
            {category}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          <a href={orgLink} className="hover:underline">
            <span aria-hidden="true" className="absolute inset-0"></span>
            {title}
          </a>
        </h3>
        
        {country && (
          <div className="flex items-center text-sm text-gray-600">
            <img src="/assets/images/flag-nigeria.png" alt="Flag" className="w-4 h-4 mr-1" />
            <span>{country}</span>
          </div>
        )}
      </div>
    </div>
  );
} 