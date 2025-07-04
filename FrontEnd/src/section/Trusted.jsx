import { motion, useAnimation } from 'framer-motion';
import { FaGlobeAmericas, FaShieldAlt, FaHandshake } from 'react-icons/fa';
import { useEffect, useRef } from 'react';

const countries = [
  { code: 'sa', name: 'Saudi Arabia', image: 'https://flagcdn.com/w160/sa.png' },
  { code: 'us', name: 'United States', image: 'https://flagcdn.com/w160/us.png' },
  { code: 'pk', name: 'Pakistan', image: 'https://flagcdn.com/w160/pk.png' },
  { code: 'om', name: 'Oman', image: 'https://flagcdn.com/w160/om.png' },
  { code: 'in', name: 'India', image: 'https://flagcdn.com/w160/in.png' },
  { code: 'gb', name: 'United Kingdom', image: 'https://flagcdn.com/w160/gb.png' },
  { code: 'ca', name: 'Canada', image: 'https://flagcdn.com/w160/ca.png' },
  { code: 'de', name: 'Germany', image: 'https://flagcdn.com/w160/de.png' },
  { code: 'fr', name: 'France', image: 'https://flagcdn.com/w160/fr.png' },
  { code: 'bd', name: 'Bangladesh', image: 'https://flagcdn.com/w160/bd.png' },
];

const Trusted = () => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    
    if (!container || !content) return;

    const contentWidth = content.scrollWidth / 2;
    const duration = 30;

    const sequence = async () => {
      await controls.start({
        x: -contentWidth,
        transition: { duration, ease: "linear" }
      });
      controls.set({ x: 0 });
      sequence();
    };

    sequence();
  }, [controls]);

  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Trusted Across Borders
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto"
          >
            Providing verified vehicle reports in {countries.length} countries worldwide
          </motion.p>
        </div>

        <div ref={containerRef} className="relative overflow-hidden h-48 mb-20">
          <motion.div
            ref={contentRef}
            className="absolute flex gap-8"
            animate={controls}
            style={{ width: 'fit-content' }}
          >
            {[...countries, ...countries].map((country, index) => (
              <motion.div
                key={`${country.code}-${index}`}
                className="flex flex-col items-center min-w-[120px]"
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden shadow-lg border-2 border-white hover:border-blue-400 transition-all">
                  <img
                    width={96}
                    height={96}
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-center object-cover "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                </div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-900 hover:text-blue-600 transition-colors">
                  {country.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <FaGlobeAmericas className="text-white text-2xl" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">Global Standards</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center">Certified vehicle reports meeting international verification protocols</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <FaShieldAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">Military-Grade Security</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center">256-bit SSL encryption protects all your searches and personal data</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <FaHandshake className="text-white text-2xl" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">Government Verified</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center">Direct integration with official vehicle registries in all served countries</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Trusted;
