import GetInvolvedCard from './GetInvolvedCard';

export default function GetInvolvedSection() {
  const categories = [
    {
      title: 'Community Leaders',
      link: '/get-involved/community-leaders',
      icon: 'https://api.iconify.design/heroicons/users-solid.svg?color=%230C8E61',
      description: 'Join community leaders in driving grassroots initiatives for identity inclusion.'
    },
    {
      title: 'Service Providers', 
      link: '/get-involved/service-providers',
      icon: 'https://api.iconify.design/heroicons/building-office-2.svg?color=%230C8E61',
      description: 'Partner with us to extend identity services to underserved communities.'
    },
    {
      title: 'Media & Influencers',
      link: '/get-involved/media-influencers', 
      icon: 'https://api.iconify.design/heroicons/megaphone.svg?color=%230C8E61',
      description: 'Help amplify the message of identity inclusion across platforms.'
    },
    {
      title: 'Government',
      link: '/get-involved/government',
      icon: 'https://api.iconify.design/heroicons/building-library.svg?color=%230C8E61',
      description: 'Collaborate on policy initiatives to make identity accessible to all.'
    }
  ];
  
  return (
    <section style={{ backgroundColor: '#8ec243' }} className="py-12 sm:py-16 md:py-20">
      <div className="site-layout px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">Get Involved</h2>
          <p className="text-lg sm:text-xl text-white">Join us in making identity accessible to everyone</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <GetInvolvedCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}