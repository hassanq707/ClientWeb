import { motion, useAnimation } from 'framer-motion';
import { FaGlobeAmericas, FaShieldAlt, FaHandshake, FaCheckCircle } from 'react-icons/fa';
import { useEffect, useRef } from 'react';

const countries = [
  { code: 'ar', name: 'Argentina', image: 'https://flagcdn.com/w160/ar.png' },
  { code: 'au', name: 'Australia', image: 'https://flagcdn.com/w160/au.png' },
  { code: 'at', name: 'Austria', image: 'https://flagcdn.com/w160/at.png' },
  { code: 'be', name: 'Belgium', image: 'https://flagcdn.com/w160/be.png' },
  { code: 'br', name: 'Brazil', image: 'https://flagcdn.com/w160/br.png' },
  { code: 'ca', name: 'Canada', image: 'https://flagcdn.com/w160/ca.png' },
  { code: 'cl', name: 'Chile', image: 'https://flagcdn.com/w160/cl.png' },
  { code: 'cn', name: 'China', image: 'https://flagcdn.com/w160/cn.png' },
  { code: 'co', name: 'Colombia', image: 'https://flagcdn.com/w160/co.png' },
  { code: 'cz', name: 'Czech Republic', image: 'https://flagcdn.com/w160/cz.png' },
  { code: 'dk', name: 'Denmark', image: 'https://flagcdn.com/w160/dk.png' },
  { code: 'eg', name: 'Egypt', image: 'https://flagcdn.com/w160/eg.png' },
  { code: 'fi', name: 'Finland', image: 'https://flagcdn.com/w160/fi.png' },
  { code: 'fr', name: 'France', image: 'https://flagcdn.com/w160/fr.png' },
  { code: 'de', name: 'Germany', image: 'https://flagcdn.com/w160/de.png' },
  { code: 'gr', name: 'Greece', image: 'https://flagcdn.com/w160/gr.png' },
  { code: 'hu', name: 'Hungary', image: 'https://flagcdn.com/w160/hu.png' },
  { code: 'ie', name: 'Ireland', image: 'https://flagcdn.com/w160/ie.png' },
  { code: 'il', name: 'Israel', image: 'https://flagcdn.com/w160/il.png' },
  { code: 'it', name: 'Italy', image: 'https://flagcdn.com/w160/it.png' },
  { code: 'jp', name: 'Japan', image: 'https://flagcdn.com/w160/jp.png' },
  { code: 'ke', name: 'Kenya', image: 'https://flagcdn.com/w160/ke.png' },
  { code: 'my', name: 'Malaysia', image: 'https://flagcdn.com/w160/my.png' },
  { code: 'mx', name: 'Mexico', image: 'https://flagcdn.com/w160/mx.png' },
  { code: 'ma', name: 'Morocco', image: 'https://flagcdn.com/w160/ma.png' },
  { code: 'nl', name: 'Netherlands', image: 'https://flagcdn.com/w160/nl.png' },
  { code: 'nz', name: 'New Zealand', image: 'https://flagcdn.com/w160/nz.png' },
  { code: 'ng', name: 'Nigeria', image: 'https://flagcdn.com/w160/ng.png' },
  { code: 'no', name: 'Norway', image: 'https://flagcdn.com/w160/no.png' },
  { code: 'pe', name: 'Peru', image: 'https://flagcdn.com/w160/pe.png' },
  { code: 'ph', name: 'Philippines', image: 'https://flagcdn.com/w160/ph.png' },
  { code: 'pl', name: 'Poland', image: 'https://flagcdn.com/w160/pl.png' },
  { code: 'pt', name: 'Portugal', image: 'https://flagcdn.com/w160/pt.png' },
  { code: 'ru', name: 'Russia', image: 'https://flagcdn.com/w160/ru.png' },
  { code: 'sg', name: 'Singapore', image: 'https://flagcdn.com/w160/sg.png' },
  { code: 'za', name: 'South Africa', image: 'https://flagcdn.com/w160/za.png' },
  { code: 'kr', name: 'South Korea', image: 'https://flagcdn.com/w160/kr.png' },
  { code: 'es', name: 'Spain', image: 'https://flagcdn.com/w160/es.png' },
  { code: 'se', name: 'Sweden', image: 'https://flagcdn.com/w160/se.png' },
  { code: 'ch', name: 'Switzerland', image: 'https://flagcdn.com/w160/ch.png' },
  { code: 'th', name: 'Thailand', image: 'https://flagcdn.com/w160/th.png' },
  { code: 'tr', name: 'Turkey', image: 'https://flagcdn.com/w160/tr.png' },
  { code: 'ae', name: 'UAE', image: 'https://flagcdn.com/w160/ae.png' },
  { code: 'gb', name: 'United Kingdom', image: 'https://flagcdn.com/w160/gb.png' },
  { code: 'us', name: 'United States', image: 'https://flagcdn.com/w160/us.png' },
  { code: 'vn', name: 'Vietnam', image: 'https://flagcdn.com/w160/vn.png' },
];


const Trusted = () => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const contentWidth = content.scrollWidth / 2;
    const duration = 60;

    controls.start({
      x: [0, -contentWidth],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration,
          ease: "linear"
        }
      }
    });
  }, [controls]);

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Trusted Across The Globe
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Providing verified vehicle reports in <span className="font-semibold text-blue-600">{countries.length}+</span> countries worldwide
          </motion.p>
        </div>

        {/* Flags Marquee */}
        <div ref={containerRef} className="relative overflow-hidden h-48 mb-24">
          <motion.div
            ref={contentRef}
            className="absolute flex gap-10"
            animate={controls}
            style={{ width: 'fit-content' }}
          >
            {[...countries, ...countries].map((country, index) => (
              <motion.div
                key={`${country.code}-${index}`}
                className="flex flex-col items-center min-w-[140px] group"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden shadow-xl border-4 border-white hover:border-blue-400 transition-all transform group-hover:rotate-3">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                </div>
                <p className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {country.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-100 relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
              <FaGlobeAmericas className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Global Standards</h3>
            <p className="text-lg text-gray-600 text-center mb-6">Certified vehicle reports meeting international verification protocols</p>
            <div className="flex justify-center">
              <div className="inline-flex items-center text-blue-600 font-medium">
                <FaCheckCircle className="mr-2" />
                ISO 9001 Certified
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-100 relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
              <FaShieldAlt className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Military-Grade Security</h3>
            <p className="text-lg text-gray-600 text-center mb-6">256-bit SSL encryption protects all your searches and personal data</p>
            <div className="flex justify-center">
              <div className="inline-flex items-center text-blue-600 font-medium">
                <FaCheckCircle className="mr-2" />
                GDPR Compliant
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-100 relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
              <FaHandshake className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Government Verified</h3>
            <p className="text-lg text-gray-600 text-center mb-6">Direct integration with official vehicle registries in all served countries</p>
            <div className="flex justify-center">
              <div className="inline-flex items-center text-blue-600 font-medium">
                <FaCheckCircle className="mr-2" />
                Official Partners
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Trusted;