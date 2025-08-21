import { useEffect } from 'react';

const ImageSlider = ({ images, currentSlide, setCurrentSlide }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, setCurrentSlide]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <div 
          key={image.id} 
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-110'
          }`}
        >
          <img 
            src={image.src} 
            alt={image.alt} 
            className="w-full h-full object-cover" 
          />
<div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
      ))}
      
      {/* Slider Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-blue-400 ring-2 ring-blue-200 ring-opacity-50 scale-125' 
                : 'bg-blue-200 bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;