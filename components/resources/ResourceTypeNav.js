import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ResourceTypeNav({ activeType = 'organisations' }) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(activeType);
  
  const resourceTypes = [
    { id: 'organisations', label: 'Organisations' },
    { id: 'policies', label: 'Policies & Programmes' }
  ];
  
  const handleTypeChange = (type) => {
    setSelectedType(type);
    
    // Update the URL with the selected type
    router.push({
      pathname: router.pathname,
      query: { ...router.query, type }
    }, undefined, { shallow: true });
  };
  
  return (
    <div className="flex gap-4 mb-8">
      {resourceTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => handleTypeChange(type.id)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedType === type.id
              ? 'bg-primary-green text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {type.label}
        </button>
      ))}
      
      {/* Search input for the right side */}
      <div className="ml-auto relative">
        <input
          type="text"
          placeholder="Search for anything"
          className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
        />
        <img
          src="https://api.iconify.design/heroicons/magnifying-glass.svg?color=%23666666"
          className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2"
          alt="Search"
        />
      </div>
    </div>
  );
} 