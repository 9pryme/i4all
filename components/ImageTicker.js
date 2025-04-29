export default function ImageTicker({ images }) {
  return (
    <div className="ticker-container overflow-hidden">
      <div className="flex animate-ticker">
        {/* First set of images */}
        {images.map((image, index) => (
          <div key={`img1-${index}`} className="flex-shrink-0 m-2 w-64 h-64">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        ))}
        
        {/* Duplicate set of images for seamless loop */}
        {images.map((image, index) => (
          <div key={`img2-${index}`} className="flex-shrink-0 m-2 w-64 h-64">
            <img 
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
} 