import ImageTicker from './ImageTicker';

export default function ExclusionSection() {
  const images = [
    {
      src: '/assets/images/exclusion/woman1.png',
      alt: 'Smiling woman with afro'
    },
    {
      src: '/assets/images/exclusion/woman2.png',
      alt: 'Woman in orange striped shirt'
    },
    {
      src: '/assets/images/exclusion/woman3.png',
      alt: 'Elderly woman portrait'
    },
    {
      src: '/assets/images/exclusion/woman4.png',
      alt: 'Woman in red headwrap'
    },
    {
      src: '/assets/images/exclusion/woman6.png',
      alt: 'Woman in yellow headwrap'
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="site-layout px-4 sm:px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-heading text-black">
            Marginalised Nigerians are more likely to be excluded from the formal economy due to a lack of ID; and the current ID enrolment framework presents barriers that disproportionately disadvantage these groups.
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <ImageTicker images={images} />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>
    </section>
  );
}