import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import GetInvolvedModal from './GetInvolvedModal';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Function to open and close modal
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('button')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);
  
  // Get current path for active link styles
  const isActive = (path) => router.pathname === path;
  
  return (
    <>
      {/* Remove Head component since it's already in Layout.js */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="site-layout">
          <nav className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" legacyBehavior>
                <a className="flex items-center">
                  <img 
                    src="/assets/logo/i4all.png" 
                    alt="I4ALL Logo" 
                    className="h-8 md:h-12 w-auto" 
                    loading="eager"
                  />
                </a>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" legacyBehavior>
                <a className={`text-gray-700 hover:text-green-600 transition-colors ${isActive('/about') ? 'text-green-600' : ''}`}>
                  About Us
                </a>
              </Link>
              <Link href="/resources" legacyBehavior>
                <a className={`text-gray-700 hover:text-green-600 transition-colors ${isActive('/resources') ? 'text-green-600' : ''}`}>
                  Resource Center
                </a>
              </Link>
              <Link href="/data-explorer" legacyBehavior>
                <a className={`text-gray-700 hover:text-green-600 transition-colors ${isActive('/data-explorer') ? 'text-green-600' : ''}`}>
                  Data Explorer
                </a>
              </Link>
              <button 
                onClick={openModal}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
              >
                Get Involved
              </button>
            </div>
            
            <button 
              className="md:hidden text-gray-600 focus:outline-none p-2 -mr-2" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                )}
              </svg>
            </button>
          </nav>
        </div>
        
        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="flex flex-col space-y-4">
            <Link href="/about" legacyBehavior>
              <a className={`text-gray-700 hover:text-green-600 py-2 px-4 transition-colors ${isActive('/about') ? 'text-green-600' : ''}`}>
                About Us »
              </a>
            </Link>
            <Link href="/resources" legacyBehavior>
              <a className={`text-gray-700 hover:text-green-600 py-2 px-4 transition-colors ${isActive('/resources') ? 'text-green-600' : ''}`}>
                Resource Center »
              </a>
            </Link>
            <Link href="/data-explorer" legacyBehavior>
              <a className={`text-gray-700 hover:text-green-600 py-2 px-4 transition-colors ${isActive('/data-explorer') ? 'text-green-600' : ''}`}>
                Data Explorer »
              </a>
            </Link>
            <button 
              onClick={openModal}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors text-center"
            >
              Get Involved
            </button>
          </div>
        </div>
      </header>
      
      <div className="h-16 md:h-20"></div> {/* Responsive spacer for fixed header */}
      
      {/* Get Involved Modal */}
      <GetInvolvedModal isOpen={modalOpen} onClose={closeModal} />
    </>
  );
}