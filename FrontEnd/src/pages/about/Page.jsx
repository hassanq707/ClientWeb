import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FaHeadset } from 'react-icons/fa';
import { ABOUT_CONTENT, MISSION_VISION, HISTORY, COUNTRIES, FAQS } from '../../constant/About.const';

const CountUp = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);
  const inView = useInView(countRef, { once: true });

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
      let startTime = null;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);
        
        if (progress < 1) {
          setCount(Math.floor(end * progress));
          requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [inView, end, duration, isVisible]);

  return (
    <span ref={countRef}>
      {count}{suffix}
    </span>
  );
};

const AboutPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

  // Animation hooks
  const refs = {
    hero: useRef(null),
    mission: useRef(null),
    vision: useRef(null),
    features: useRef(null),
    team: useRef(null),
    history: useRef(null),
    stats: useRef(null),
    countries: useRef(null),
    testimonials: useRef(null),
    awards: useRef(null),
    faq: useRef(null)
  };

  const controls = {};
  Object.keys(refs).forEach(key => {
    controls[key] = useAnimation();
  });

  const inView = {};
  Object.keys(refs).forEach(key => {
    inView[key] = useInView(refs[key], { once: true, margin: "-100px" });
  });

  useEffect(() => {
    Object.keys(inView).forEach(key => {
      if (inView[key]) {
        controls[key].start("visible");
      }
    });
  }, [inView]);

  // Animation variants
  const fadeUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const scaleUp = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      {/* Hero Section */}
      <motion.section 
        ref={refs.hero}
        initial="hidden"
        animate={controls.hero}
        className="text-center mb-16 md:mb-24 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-cyan-50 rounded-3xl -z-10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-cyan-100 rounded-full opacity-20 animate-pulse"></div>
        
        <motion.div variants={fadeUp} className="relative z-10 py-16">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {ABOUT_CONTENT.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
            {ABOUT_CONTENT.description}
           </p>
           <motion.div 
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              🚀 Industry Leading
            </span>
            <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
              🔒 Secure & Trusted
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              ⚡ Lightning Fast
            </span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Key Features Section */}
      <motion.section
        ref={refs.features}
        initial="hidden"
        animate={controls.features}
        className="mb-16 md:mb-24"
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto"></div>
         </motion.div>
        
         <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
           {[
            {
              icon: "🔍",
              title: "Comprehensive Verification",
              description: "Deep asset verification with multi-layered security checks and real-time validation.",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: "🌐",
              title: "Global Network",
              description: "Access to worldwide databases and government registries for complete coverage.",
              color: "from-blue-600 to-blue-700"
            },
            {
              icon: "⚡",
              title: "Instant Results",
              description: "Get comprehensive reports in seconds with our advanced AI-powered analysis.",
              color: "from-cyan-500 to-blue-500"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={scaleUp}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
               </p>
             </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        ref={refs.mission}
        initial="hidden"
        animate={controls.mission}
        variants={slideLeft}
        className="mb-16 md:mb-24"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-100">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-6 mt-4">
                {MISSION_VISION.mission.title}
              </h2>
              <div className="space-y-4">
                {MISSION_VISION.mission.content.map((text, i) => (
                  <p key={i} className="text-md md:text-lg text-gray-700 leading-relaxed">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div variants={slideRight} className="relative">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-100">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">🚀</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-6 mt-4">
                {MISSION_VISION.vision.title}
              </h2>
              <div className="space-y-4">
                {MISSION_VISION.vision.content.map((text, i) => (
                  <p key={i} className="text-md md:text-lg text-gray-700 leading-relaxed">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Values Section */}
      <motion.section
        ref={refs.team}
        initial="hidden"
        animate={controls.team}
        className="mb-16 md:mb-24"
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
             The principles that guide everything we do
           </p>
         </motion.div>
        
        <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
            { icon: "🔒", title: "Security First", desc: "Your data protection is our top priority" },
            { icon: "🎯", title: "Accuracy", desc: "Precise and reliable information every time" },
            { icon: "⚡", title: "Innovation", desc: "Cutting-edge technology for better results" },
            { icon: "🤝", title: "Trust", desc: "Building lasting relationships with integrity" }
          ].map((value, i) => (
            <motion.div
              key={i}
              variants={scaleUp}
              whileHover={{ y: -5, rotate: 2 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center group hover:shadow-lg transition-all"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* History Timeline */}
      <motion.section
        ref={refs.history}
        initial="hidden"
        animate={controls.history}
        className="mb-16 md:mb-24"
      >
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From humble beginnings to industry leadership
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 mx-auto mt-4"></div>
        </motion.div>
        
        <motion.div variants={staggerContainer} className="relative max-w-4xl mx-auto">
          <div className="absolute left-5 sm:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-200 via-cyan-300 to-blue-500"></div>
          <div className="space-y-12 md:space-y-16">
            {HISTORY.map((item, index) => (
              <motion.div key={index} variants={fadeUp} className="relative pl-10 sm:pl-0">
                <div className={`flex flex-col sm:flex-row ${index % 2 === 0 ? '' : 'sm:flex-row-reverse'} gap-6 md:gap-8 items-center`}>
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className="absolute -left-1 sm:left-1/2 w-6 h-6 -ml-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 border-4 border-white shadow-lg z-10"
                  ></motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className={`flex-1 ${index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left'}`}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-3">
                      {item.year}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">{item.content}</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    className="flex-1 w-full"
                  >
                    <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg border border-gray-100 h-full transform transition-all hover:shadow-xl">
                      <div className="text-5xl mb-4 text-center">
                        {['🚀', '🌎', '💡', '🏆'][index] || '🌟'}
                      </div>
                       <h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                         {['Foundation', 'Global Expansion', 'Innovation Hub', 'Industry Leader'][index] || 'Milestone'}
                       </h4>
                       <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                         <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-600"
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Enhanced Stats Section */}
      <motion.section
        ref={refs.stats}
        initial="hidden"
        animate={controls.stats}
        className="mb-16 md:mb-24"
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
          <p className="text-xl text-gray-600">Numbers that speak for themselves</p>
        </motion.div>
        
        <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {ABOUT_CONTENT.stats.map((stat, i) => (
            <motion.div 
              key={i}
              variants={scaleUp}
              whileHover={{ y: -8, scale: 1.05 }}
              className="relative bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 text-center group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <motion.p 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-3"
                >
                  <CountUp 
                    end={parseInt(stat.value.replace(/[^0-9]/g, ''))} 
                    duration={1}
                    suffix={stat.value.replace(/[0-9]/g, '')}
                  />
                </motion.p>
                <p className="text-lg text-gray-700 font-medium">{stat.label}</p>
                <div className="mt-3 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-600"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Countries Section */}
      <motion.section
        ref={refs.countries}
        initial="hidden"
        animate={controls.countries}
        className="mb-16 md:mb-24"
      >
        <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Global Coverage</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fusions Car provides comprehensive asset verification across multiple jurisdictions
          </p>
        </motion.div>
        
        <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COUNTRIES.map((country, i) => (
            <motion.div 
              key={i}
              variants={scaleUp}
              whileHover={{ y: -8, rotateY: 5 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 group hover:shadow-xl transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-start mb-4">
                  <motion.span 
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-5xl mr-4"
                  >
                    {country.icon}
                  </motion.span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {country.name}
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 mt-2"></div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{country.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                   <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-full text-sm font-medium">
                     {['Full Coverage', 'Government Verified', 'Real-time Data'][i % 3]}
                   </span>
                 </div>
               </div>
             </motion.div>
          ))}
        </motion.div>
      </motion.section>

       {/* Awards Section */}
       <motion.section
        ref={refs.awards}
        initial="hidden"
        animate={controls.awards}
        className="mb-16 md:mb-24"
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Recognition & Awards</h2>
          <p className="text-xl text-gray-600">Industry acknowledgment of our excellence</p>
        </motion.div>
        
        <motion.div variants={staggerContainer} className="grid md:grid-cols-4 gap-6">
          {[
            { icon: "🏆", title: "Best Fintech 2024", org: "Tech Innovation Awards" },
            { icon: "🥇", title: "Excellence in Security", org: "Cyber Security Council" },
            { icon: "🌟", title: "Top Rated Platform", org: "Industry Review Board" },
            { icon: "🎖️", title: "Innovation Leader", org: "Global Finance Summit" }
          ].map((award, i) => (
            <motion.div
              key={i}
              variants={scaleUp}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center group hover:shadow-lg transition-all"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {award.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {award.title}
              </h3>
              <p className="text-sm text-gray-600">
                {award.org}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

       {/* FAQ Section */}
   <motion.section
        ref={refs.faq}
        initial="hidden"
        animate={controls.faq}
        className="py-28"
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about Asset Central Report
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="space-y-4"
          >
            {FAQS.map((faq, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div 
                  onClick={() => toggleFaq(i)}
                  className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 cursor-pointer transition-all ${activeFaq === i ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: activeFaq === i ? 180 : 0 }}
                      className="text-blue-500"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 text-gray-600">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={fadeUp}
            className="mt-16 text-center"
          >
            <p className="text-xl text-gray-600 mb-8">Still have questions?</p>
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
            >
              <Link to='/contact' className="flex items-center justify-center">
                <FaHeadset className="mr-2" />
                Contact Our Support Team
              </Link>
            </motion.button>
          </motion.div>
        </div>
      </motion.section> 
     </div>
   );
 };

 export default AboutPage;
