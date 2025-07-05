import React, { useState, useEffect } from 'react';
import {FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Al-Saud',
    role: 'Car Dealer, Riyadh',
    content: 'The vehicle reports saved me from purchasing a flood-damaged car. The detailed history and accident reports are worth every riyal!',
    rating: 5,
    country: '🇸🇦',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Used Car Buyer, Texas',
    content: 'I avoided a stolen vehicle thanks to their comprehensive report. The customer support team was incredibly helpful throughout the process.',
    rating: 5,
    country: '🇺🇸',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 3,
    name: 'Carlos Mendes',
    role: 'Private Buyer, São Paulo',
    content: 'The mileage verification feature helped me uncover tampering before making what would have been a terrible purchase decision. Lifesaver!',
    rating: 5,
    country: '🇧🇷',
    image: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
  {
    id: 4,
    name: 'Emma Dubois',
    role: 'Car Enthusiast, Paris',
    content: 'The report was so detailed it included service history from 5 years ago. Gave me complete peace of mind for my vintage car purchase.',
    rating: 5,
    country: '🇫🇷',
    image: 'https://randomuser.me/api/portraits/women/28.jpg'
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 8000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, current]);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-100 rounded-full opacity-20"></div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Voices of Trust</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join <span className="text-blue-600 font-semibold">{testimonials.length * 250}+</span> satisfied customers worldwide
          </p>
        </motion.div>

        <div
          className="relative  max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden ">
            <div
              className="flex  transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white p-10 rounded-3xl border border-gray-100"
                  >

                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 shadow-md">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-xl text-gray-700 mb-6 leading-relaxed">{testimonial.content}</p>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900">{testimonial.name}</h4>
                            <p className="text-gray-600">{testimonial.role} <span className="text-2xl">{testimonial.country}</span></p>
                          </div>

                          <div className="flex mt-4 sm:mt-0">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`text-2xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} ml-1`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-4 rounded-full shadow-lg border border-gray-200 hover:bg-blue-50 text-blue-600 transition-all duration-300 hover:scale-110"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-4 rounded-full shadow-lg border border-gray-200 hover:bg-blue-50 text-blue-600 transition-all duration-300 hover:scale-110"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>

        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${i === current ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;