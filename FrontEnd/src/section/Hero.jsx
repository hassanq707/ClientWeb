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
    year: ''
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
            expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes in ms
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
    <section className="relative bg-gray-50 min-h-screen">
      <ImageSlider
        images={images}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-10 md:pt-4 pb-14 md:py-8">
        <div className="w-full ">
          <div className="flex  flex-col md:flex-row items-stretch gap-10 md:gap-12">
            {/* InfoSection  */}
            <div
              className={`w-full md:flex-1 order-1 md:order-1 ${showAnimation ? 'animate-left' : 'opacity-0'}`}
            >
              <div className="w-full h-full flex items-center">
                <InfoSection
                  currentTypeIndex={currentSlide}
                  currentText={<TypeWriter words={vehicleTypes} currentIndex={currentSlide} />}
                />
              </div>
            </div>

            {/* FormSection */}
            <div
              className={`w-full md:w-[360px] lg:w-[410px] xl:w-[450px] order-2 md:order-2 ${showAnimation ? 'animate-right' : 'opacity-0'}`}
            >
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