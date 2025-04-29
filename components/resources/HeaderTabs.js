import { useState } from 'react';

export default function HeaderTabs({ activeTab = 'internal', onTabChange }) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const primaryOrange = '#FE6800';
  
  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };
  
  return (
    <div className="mb-8">
      <style jsx>{`
        .header-tab-active {
          border-bottom-color: ${primaryOrange};
        }
      `}</style>
      <div className="flex w-full border-b border-gray-200">
        {/* Internal Resources Tab */}
        <button 
          className={`flex-1 px-6 py-3 transition-colors duration-200 ${
            currentTab === 'internal' ? 'border-b-2 header-tab-active text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => handleTabClick('internal')}
        >
          <span className="text-lg">Resources from Inclusion 4 all</span>
        </button>

        {/* Ecosystem Tab */}
        <button 
          className={`flex-1 px-6 py-3 transition-colors duration-200 ${
            currentTab === 'ecosystem' ? 'border-b-2 header-tab-active text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => handleTabClick('ecosystem')}
        >
          <span className="text-lg">Ecosystem Resources</span>
        </button>
      </div>
    </div>
  );
} 