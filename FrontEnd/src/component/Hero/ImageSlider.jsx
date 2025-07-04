// ImageSlider.jsx
import { useEffect } from 'react';

const ImageSlider = ({ images, currentSlide, setCurrentSlide }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, setCurrentSlide]);

  return (
    <div className="absolute inset-0 -top-4">
      {images.map((image, index) => (
        <div key={image.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
          <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}
    </div>
  );  
};

export default ImageSlider;