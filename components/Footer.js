import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{ backgroundColor: '#2C3639' }} className="py-8 sm:py-12">
      <div className="site-layout px-4 sm:px-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8 sm:mb-12 gap-8">
          {/* Logo Section */}
          <div className="w-full lg:w-1/3">
            <a href="/" className="block mb-4">
              <img 
                src="/assets/logo/i4all-white.png" 
                alt="I4ALL" 
                className="w-auto h-8 sm:h-10 md:h-12 lg:h-14"
                style={{ maxWidth: '240px' }}
              />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8 w-full lg:w-2/3">
            <div className="text-center sm:text-left">
              <a 
                href="/about" 
                className="text-white text-sm sm:text-base hover:text-[#0C8E61] transition-colors"
              >
                About
              </a>
            </div>
            <div className="text-center sm:text-left">
              <a href="/stories-data" className="text-white text-sm sm:text-base hover:text-[#0C8E61] transition-colors">
                Stories & Data
              </a>
            </div>
            <div className="text-center sm:text-left">
              <a href="/media-center" className="text-white text-sm sm:text-base hover:text-[#0C8E61] transition-colors">
                Media Center
              </a>
            </div>
            <div className="text-center sm:text-left">
              <a href="/resources" className="text-white text-sm sm:text-base hover:text-[#0C8E61] transition-colors">
                Resource
              </a>
            </div>
            <div className="text-center sm:text-left">
              <a href="/contact-us" className="text-white text-sm sm:text-base hover:text-[#0C8E61] transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="text-white hover:text-[#0C8E61] transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-[#0C8E61] transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-[#0C8E61] transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-[#0C8E61] transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-[#0C8E61] transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          {/* Copyright & Terms */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-white text-xs sm:text-sm">© {currentYear} Inclusion for all. All rights reserved.</span>
            <a href="/terms" className="text-white text-xs sm:text-sm hover:text-[#0C8E61] transition-colors">
              Terms of Use and Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 