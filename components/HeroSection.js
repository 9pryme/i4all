export default function HeroSection({ title = 'About Us', bodyText = '' }) {
  // Define colors
  const bgColor = '#000000';
  const lineGradient = 'rgba(255,255,255,0.1)';
  const textColor = '#FFFFFF';
  const paragraphColor = 'rgba(255, 255, 255, 0.9)';
  const overlayGradient = 'rgba(0,0,0,0.5)';
  
  return (
    <section className="relative py-20 sm:py-24 md:py-28 overflow-hidden" style={{ backgroundColor: bgColor }}>
      {/* Curved lines background pattern */}
      <div className="absolute inset-0 w-full h-full opacity-10">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-full h-[100px] transform rotate-[-4deg]"
            style={{ 
              top: `${(i * 80) - 120}px`, // Moved up by adjusting the offset from -80 to -120
              background: `linear-gradient(90deg, transparent, ${lineGradient} 50%, transparent)` 
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="site-layout relative z-10 px-4 sm:px-6">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-6" style={{ color: textColor }}>
            {title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed" style={{ color: paragraphColor }}>
            {bodyText}
          </p>
        </div>
      </div>

      {/* Gradient overlay at the bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: `linear-gradient(to bottom, transparent, ${overlayGradient})` }}
      />
    </section>
  );
} 