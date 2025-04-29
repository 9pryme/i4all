import React, { useState } from 'react';
import GetInvolvedModal from './GetInvolvedModal';

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <section className="bg-[#FDF8E7] py-8 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-full max-w-7xl mb-6">
            <img 
              src="/assets/images/hero-image.png" 
              alt="Financial Inclusion Illustration" 
              className="w-full h-auto"
            />
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-8">
              Removing barriers to financial inclusion for underserved Nigerian communities.
            </h1>
            <div>
              <button
                onClick={openModal}
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-full text-base hover:bg-green-700 transition duration-300">
                Get Involved
              </button>
            </div>
          </div>
        </div>
      </div>

      <GetInvolvedModal isOpen={modalOpen} onClose={closeModal} />
    </section>
  );
} 