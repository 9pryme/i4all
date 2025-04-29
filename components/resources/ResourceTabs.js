import { useState, useEffect } from 'react';

export default function ResourceTabs({ activeTab = 'all', onTabChange }) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  
  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'news', label: 'News & Announcement' },
    { key: 'events', label: 'Events' },
    { key: 'knowledge', label: 'Knowledge Base' }
  ];
  
  useEffect(() => {
    // Call parent component callback when tab changes
    if (onTabChange) {
      onTabChange(currentTab);
    }
  }, [currentTab, onTabChange]);
  
  const handleTabClick = (key) => {
    setCurrentTab(key);
  };
  
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {tabs.map(tab => (
        <button 
          key={tab.key}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            tab.key === currentTab ? 'bg-primary-green text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => handleTabClick(tab.key)}
        >
          {tab.label}
        </button>
      ))}

      {/* Search Box */}
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