import { useState } from 'react';

export default function NewsletterSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, you would send this data to your API
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '' });
    // Show success message
    alert('Thank you for subscribing!');
  };
  
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/images/newsletter-bg.png" 
          alt="City skyline" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="site-layout relative z-10 px-4 sm:px-6">
        <div style={{ backgroundColor: '#0C8E61', borderRadius: '40px' }} className="p-8 sm:p-12 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Subscribe to the Inclusion for all mailing list.
          </h2>
          <p className="text-lg sm:text-xl text-white mb-8">
            Get the latest updates from Inclusion for all.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="First name & Last name" 
                style={{ borderRadius: '8px' }}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="sample@email.com" 
                style={{ borderRadius: '8px' }}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                required
              />
            </div>

            <button 
              type="submit"
              style={{ borderRadius: '9999px' }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#0C8E61] hover:bg-gray-100 transition-colors duration-300 font-medium"
            >
              SUBSCRIBE NOW
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
} 