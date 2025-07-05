import { useState, useEffect } from 'react';
import FormSection from '../component/Hero/Form';
import ImageSlider from '../component/Hero/ImageSlider';
import InfoSection from '../component/Hero/InfoSection';
import TypeWriter from '../component/Hero/TypeWriter';
import axios from 'axios';

const HeroSection = () => {
  const vehicleTypes = ['Car', 'Bike', 'Truck', 'Ship'];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const url = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    fullname: '',
    vinNumber: '',
    vehicleModel: '',
    year: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    setShowAnimation(false);
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 70);
    return () => clearTimeout(timer);
  }, []);

  const images = [
    { id: 1, src: '/car.jpg', alt: 'Car report' },
    { id: 2, src: '/bike.jpg', alt: 'Bike report' },
    { id: 3, src: '/truck.jpg', alt: 'Truck report' },
    { id: 4, src: '/boat.jpg', alt: 'Ship report' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/orders`, formData)
      if (data.success) {
        localStorage.setItem(
          "orderData",
          JSON.stringify({
            data: data.order,
            expiresAt: Date.now() + 10 * 60 * 1000 // expires in 10 minutes 
          })
        );
      } else {
        console.log(data.message)
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <section className="relative  -mt-4 md:-mt-2 min-h-screen overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/30 z-0"></div>
      
      <ImageSlider
        images={images}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />

      <div className="relative z-10  container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-10 md:pt-4 pb-14 md:py-8">
        <div className="w-full pt-8">
          <div className="flex flex-col lg:flex-row items-stretch gap-8 md:gap-12">
            {/* InfoSection */}
            <div className={`w-full lg:flex-1 order-1 ${showAnimation ? 'animate-left' : 'opacity-0'}`}>
              <div className="w-full h-full flex items-center">
                <InfoSection
                  currentTypeIndex={currentSlide}
                  currentText={<TypeWriter words={vehicleTypes} currentIndex={currentSlide} />}
                />
              </div>
            </div>

            {/* FormSection */}
            <div className={`w-full lg:w-[450px] xl:w-[500px] order-2 ${showAnimation ? 'animate-right' : 'opacity-0'}`}>
              <div className="w-full h-full flex items-center">
                <FormSection
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;