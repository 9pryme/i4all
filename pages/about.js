import Head from 'next/head';
import Layout from '../components/Layout';
import NewsletterSection from '../components/NewsletterSection';
import { useState, useEffect } from 'react';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Inclusion For All</title>
        <meta name="description" content="Understanding and mitigating the impact of exclusion on marginalised communities." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main>
        {/* About Hero Section */}
        <section className="relative py-12 sm:py-20 md:py-24 lg:py-28 overflow-hidden" style={{ backgroundColor: '#000000' }}>
          {/* Curved lines background pattern */}
          <div className="absolute inset-0 w-full h-full opacity-10">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-full h-[100px] transform rotate-[-4deg]"
                style={{ 
                  top: `${(i * 80) - 80}px`, 
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 50%, transparent)' 
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="site-layout relative z-10 px-4 sm:px-6">
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 sm:mb-6" style={{ color: '#FFFFFF' }}>
                About Us
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Understanding and mitigating the impact of exclusion on marginalised communities. With more than 38 million Nigerian adults completely excluded from the financial system and 59 million without bank accounts, financial exclusion remains a significant contributor to wider exclusion challenges, and is a core focus of the Inclusion for All initiative.
              </p>
            </div>
          </div>

          {/* Gradient overlay at the bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-24 sm:h-32"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))' }}
          />
        </section>

        {/* Full-width image */}
        <img 
          src="/assets/images/image.png"
          alt="About section image"
          className="w-full h-48 sm:h-auto object-cover"
        />
        
        {/* Barriers Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="site-layout px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-[#FF6B00] mb-4 sm:mb-6 font-heading leading-tight">
                Multi-faceted barriers exist, extenuating exclusion
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-900 leading-relaxed font-semibold">
                Marginalised communities face a wide variety of barriers to inclusion, from 
                ownership of the Identity documentation required to access services, to the cost of 
                entry and proximity of an access point of those services as well as cultural, religious 
                and trust barriers.
              </p>
            </div>

            {/* Image Container */}
            <div className="my-8 sm:my-12 md:my-16">
              <img 
                src="/assets/images/image.png"
                alt="Financial barriers illustration"
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded-lg sm:rounded-2xl shadow-xl"
              />
            </div>

            {/* Barriers Grid */}
            <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Understanding Exclusion */}
              <div className="bg-primary-green p-6 sm:p-8 rounded-lg sm:rounded-xl shadow-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <img src="https://api.iconify.design/heroicons/identification.svg?color=%23FF6B00" className="w-5 h-5 sm:w-6 sm:h-6" alt="ID" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 font-heading">Understanding Exclusion</h3>
                <p className="text-white font-medium text-sm sm:text-base">The Inclusion for All initiative is a multi-faceted advocacy programme that seeks to deepen our knowledge and understanding of the impact of exclusion on marginalised communities, and on Nigeria as a whole, while advocating for the barriers to their inclusion to be removed.</p>
              </div>

              {/* Supporting Communities */}
              <div className="bg-primary-yellow p-6 sm:p-8 rounded-lg sm:rounded-xl shadow-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <img src="https://api.iconify.design/heroicons/users.svg?color=%23FF6B00" className="w-5 h-5 sm:w-6 sm:h-6" alt="Culture" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-heading">Supporting Communities</h3>
                <p className="text-gray-900 font-medium text-sm sm:text-base">Marginalised communities are desperately in need of help and support but they are the most difficult groups to access in order to provide it. They are more likely to be women, young and to live in rural areas. We want everyone to have access to the support and services that give them the ability to enhance their lives.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="site-layout px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Left Column - Header and Text */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 font-heading">Frequently Asked Questions</h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Answer you're looking for not here? 
                  <a href="/contact" className="text-primary-orange hover:text-primary-orange-dark font-semibold ml-1">Get in touch</a>
                </p>
              </div>

              {/* Right Column - Tabs and Accordion */}
              <div>
                {/* Tabs */}
                <div className="flex gap-2 sm:gap-4 mb-8 sm:mb-12 flex-wrap">
                  <button className="px-4 sm:px-6 py-2 rounded-full bg-black text-white font-semibold text-sm sm:text-base">QUESTIONS</button>
                  <button className="px-4 sm:px-6 py-2 rounded-full bg-white text-gray-600 font-semibold text-sm sm:text-base">METHODOLOGY</button>
                  <button className="px-4 sm:px-6 py-2 rounded-full bg-white text-gray-600 font-semibold text-sm sm:text-base">HOW TO USE THIS SITE</button>
                </div>

                {/* Accordion */}
                <div className="space-y-3 sm:space-y-4">
                  <Accordion 
                    items={[
                      {
                        id: 'support',
                        question: 'How can I support or engage with you?',
                        answer: 'See our get involved page to understand how different partners can support our work, or contact us for a specific conversation.',
                        isOpen: true
                      },
                      {
                        id: 'represent',
                        question: 'Who do you represent?',
                        answer: 'We represent marginalized communities across Nigeria who face barriers to financial inclusion, including women, youth, rural populations, and other underserved groups.'
                      },
                      {
                        id: 'countries',
                        question: 'Which countries does Inclusion for all cover?',
                        answer: 'Currently, our initiative focuses on Nigeria, where we work to understand and address the specific challenges and barriers to financial inclusion faced by marginalized communities.'
                      },
                      {
                        id: 'issues',
                        question: 'What issues are you campaigning on?',
                        answer: 'We campaign on various issues related to financial inclusion, including access to banking services, digital financial literacy, identity documentation, and removing cultural and religious barriers to financial services.'
                      },
                      {
                        id: 'focus',
                        question: 'What is the thematic focus of the initiative?',
                        answer: 'Our initiative focuses on understanding and addressing the multi-faceted barriers to financial inclusion, advocating for policy changes, and developing practical solutions to make financial services accessible to all Nigerians.'
                      },
                      {
                        id: 'operate',
                        question: 'How does Inclusion for all operate?',
                        answer: 'We operate through research, advocacy, and partnerships with local communities, financial institutions, and policymakers to identify barriers to inclusion and develop effective solutions.'
                      }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section (using the existing component) */}
        <NewsletterSection />
      </main>
    </>
  );
}

// Accordion Component
function Accordion({ items }) {
  const [openItemId, setOpenItemId] = useState(items.find(item => item.isOpen)?.id || null);

  const handleToggle = (id) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openItemId === item.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}

function AccordionItem({ id, question, answer, isOpen = false, onToggle }) {
  const [expanded, setExpanded] = useState(isOpen);
  
  useEffect(() => {
    setExpanded(isOpen);
  }, [isOpen]);
  
  useEffect(() => {
    // Initialize the accordion item with proper maxHeight on client side
    const content = document.getElementById(`accordion-content-${id}`);
    if (content) {
      content.style.maxHeight = expanded ? `${content.scrollHeight}px` : '0';
    }
  }, [expanded, id]);
  
  const toggleAccordion = () => {
    onToggle(id);
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl">
      <div className="px-4 sm:px-6">
        <button 
          className="accordion-trigger w-full flex items-center justify-between py-4 sm:py-6 text-left"
          aria-expanded={expanded}
          aria-controls={`accordion-content-${id}`}
          onClick={toggleAccordion}
        >
          <span className="text-base sm:text-xl font-semibold text-gray-900">{question}</span>
          <svg 
            className={`accordion-icon w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div 
          id={`accordion-content-${id}`}
          className="accordion-content overflow-hidden transition-all duration-200 max-h-0"
        >
          <div className="py-4 sm:py-6 text-sm sm:text-base text-gray-600">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

About.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}; 