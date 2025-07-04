// import React, { useState } from 'react';
// import FAQItem from '../../component/FAQ';
// import { ABOUT_CONTENT, MISSION_VISION, HISTORY, COUNTRIES, FAQS } from '../../constant/About.const';

// const AboutPage = () => {
//   const [activeFaq, setActiveFaq] = useState(null);
//   const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       {/* Hero */}
//       <section className="text-center mb-16">
//         <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">{ABOUT_CONTENT.title}</h1>
//         <p className="text-xl text-gray-600 max-w-4xl mx-auto">{ABOUT_CONTENT.description}</p>
//       </section>

//       {/* Mission */}
//       <section className="bg-white p-10 rounded-2xl shadow-md border mb-16">
//         <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-8">
//           {MISSION_VISION.mission.title}
//         </h2>
//         <div className="space-y-6">
//           {MISSION_VISION.mission.content.map((text, i) => (
//             <p key={i} className="text-lg text-gray-700">{text}</p>
//           ))}
//         </div>
//       </section>

//       {/* Vision */}
//       <section className="bg-gradient-to-br from-blue-50 to-white p-10 rounded-2xl shadow-md border mb-16">
//         <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-8">
//           {MISSION_VISION.vision.title}
//         </h2>
//         <div className="space-y-6">
//           {MISSION_VISION.vision.content.map((text, i) => (
//             <p key={i} className="text-lg text-gray-700">{text}</p>
//           ))}
//         </div>
//       </section>

//       {/* History */}
//       <section className="mb-16">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto"></div>
//         </div>
//         <div className="relative max-w-4xl mx-auto">
//           <div className="absolute left-5 sm:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-200 to-blue-500"></div>
//           <div className="space-y-12">
//             {HISTORY.map((item, index) => (
//               <div key={index} className="relative pl-10 sm:pl-0">
//                 <div className={`flex flex-col sm:flex-row ${index % 2 === 0 ? '' : 'sm:flex-row-reverse'} gap-8 items-center`}>
//                   <div className="absolute -left-1 sm:left-1/2 w-4 h-4 -ml-2 rounded-full bg-blue-600 border-4 border-blue-100"></div>
//                   <div className={`flex-1 ${index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left'}`}>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.year}</h3>
//                     <p className="text-lg text-gray-700">{item.content}</p>
//                   </div>
//                   <div className="flex-1">
//                     <div className="bg-white p-6 rounded-xl shadow-md border h-full">
//                       <div className="text-5xl text-blue-600 mb-4">
//                         {['🚀', '🌎', '💡', '🏆'][index] || '🌟'}
//                       </div>
//                       <h4 className="text-xl font-semibold text-gray-800 mb-2">
//                         {['Foundation', 'Expansion', 'Innovation', 'Leadership'][index] || 'Milestone'}
//                       </h4>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
//         {ABOUT_CONTENT.stats.map((stat, i) => (
//           <div key={i} className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-md border text-center">
//             <p className="text-4xl font-bold text-blue-600 mb-3">{stat.value}</p>
//             <p className="text-lg text-gray-700 font-medium">{stat.label}</p>
//           </div>
//         ))}
//       </section>

//       {/* Countries */}
//       <section className="mb-16">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">Global Coverage</h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Asset Central Report provides comprehensive asset verification across multiple jurisdictions
//           </p>
//         </div>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {COUNTRIES.map((country, i) => (
//             <div key={i} className="bg-white p-6 rounded-xl shadow-md border group hover:shadow-lg transition-all">
//               <div className="flex items-start mb-4">
//                 <span className="text-4xl mr-4">{country.icon}</span>
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600">{country.name}</h3>
//                   <div className="w-12 h-1 bg-blue-500 mt-2"></div>
//                 </div>
//               </div>
//               <p className="text-gray-600">{country.description}</p>
//               <div className="mt-4 pt-4 border-t">
//                 <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
//                   {['Full Coverage', 'Government Verified', 'Real-time Data'][i % 3]}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FAQ */}
//       <section className="max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
//           <p className="text-xl text-gray-600">Everything you need to know about Asset Central Report</p>
//         </div>
//         <div className="space-y-4">
//           {FAQS.map((faq, i) => (
//             <FAQItem
//               key={i}
//               question={faq.question}
//               answer={faq.answer}
//               isOpen={activeFaq === i}
//               onClick={() => toggleFaq(i)}
//             />
//           ))}
//         </div>
//         <div className="mt-12 text-center">
//           <p className="text-lg text-gray-600 mb-6">Still have questions?</p>
//           <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition">
//             Contact Our Support Team
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;



import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import {Link} from 'react-router-dom'
import FAQItem from '../../component/FAQ';
import { ABOUT_CONTENT, MISSION_VISION, HISTORY, COUNTRIES, FAQS } from '../../constant/About.const';

const AboutPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

  // Animation hooks
  const refs = {
    hero: useRef(null),
    mission: useRef(null),
    vision: useRef(null),
    history: useRef(null),
    stats: useRef(null),
    countries: useRef(null),
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      {/* Hero Section */}
      <motion.section 
        ref={refs.hero}
        initial="hidden"
        animate={controls.hero}
        className="text-center mb-16 md:mb-24"
      >
        <motion.h1 
          variants={fadeUp}
          className="text-4xl sm:text-5xl  font-bold text-gray-900 mb-6"
        >
          {ABOUT_CONTENT.title}
        </motion.h1>
        <motion.p 
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto"
        >
          {ABOUT_CONTENT.description}
        </motion.p>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        ref={refs.mission}
        initial="hidden"
        animate={controls.mission}
        variants={scaleUp}
        className="bg-gradient-to-br from-white to-blue-50 p-8 sm:p-10 rounded-2xl shadow-lg  border-gray-100 mb-16 md:mb-24"
      >
        <motion.h2 
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-8"
        >
          {MISSION_VISION.mission.title}
        </motion.h2>
        <motion.div 
          variants={staggerContainer}
          className="space-y-6"
        >
          {MISSION_VISION.mission.content.map((text, i) => (
            <motion.p 
              key={i}
              variants={fadeUp}
              className="text-md md:text-lg text-gray-700"
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        ref={refs.vision}
        initial="hidden"
        animate={controls.vision}
        variants={scaleUp}
        className="bg-gradient-to-br from-blue-50 to-white p-8 sm:p-10 rounded-2xl shadow-lg border border-blue-100 mb-16 md:mb-24"
      >
        <motion.h2 
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-8"
        >
          {MISSION_VISION.vision.title}
        </motion.h2>
        <motion.div 
          variants={staggerContainer}
          className="space-y-6"
        >
          {MISSION_VISION.vision.content.map((text, i) => (
            <motion.p 
              key={i}
              variants={fadeUp}
              className="text-md md:text-lg text-gray-700"
            >
              {text}
            </motion.p>
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
        <motion.div 
          variants={fadeUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto"></div>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          className="relative max-w-4xl mx-auto"
        >
          <div className="absolute left-5 sm:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-200 to-blue-500"></div>
          <div className="space-y-12 md:space-y-16">
            {HISTORY.map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeUp}
                className="relative pl-10 sm:pl-0"
              >
                <div className={`flex flex-col sm:flex-row ${index % 2 === 0 ? '' : 'sm:flex-row-reverse'} gap-6 md:gap-8 items-center`}>
                  <div className="absolute -left-1 sm:left-1/2 w-4 h-4 -ml-2 rounded-full bg-blue-600 border-4 border-blue-100 z-10"></div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className={`flex-1 ${index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left'}`}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{item.year}</h3>
                    <p className="text-lg text-gray-700">{item.content}</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 w-full"
                  >
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full transform transition-all hover:shadow-lg">
                      <div className="text-5xl text-blue-600 mb-4">
                        {['🚀', '🌎', '💡', '🏆'][index] || '🌟'}
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        {['Foundation', 'Expansion', 'Innovation', 'Leadership'][index] || 'Milestone'}
                      </h4>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        ref={refs.stats}
        initial="hidden"
        animate={controls.stats}
        className="mb-16 md:mb-24"
      >
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {ABOUT_CONTENT.stats.map((stat, i) => (
            <motion.div 
              key={i}
              variants={scaleUp}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-white to-blue-50 p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold text-blue-600 mb-3">{stat.value}</p>
              <p className="text-lg text-gray-700 font-medium">{stat.label}</p>
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
        <motion.div 
          variants={fadeUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Global Coverage</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Asset Central Report provides comprehensive asset verification across multiple jurisdictions
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {COUNTRIES.map((country, i) => (
            <motion.div 
              key={i}
              variants={scaleUp}
              whileHover={{ y: -8 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 group hover:shadow-lg transition-all"
            >
              <div className="flex items-start mb-4">
                <span className="text-4xl mr-4">{country.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600">{country.name}</h3>
                  <div className="w-12 h-1 bg-blue-500 mt-2"></div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{country.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                  {['Full Coverage', 'Government Verified', 'Real-time Data'][i % 3]}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        ref={refs.faq}
        initial="hidden"
        animate={controls.faq}
        className="max-w-4xl mx-auto"
      >
        <motion.div 
          variants={fadeUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about Asset Central Report</p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          className="space-y-4"
        >
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={activeFaq === i}
                onClick={() => toggleFaq(i)}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          variants={fadeUp}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">Still have questions?</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
          >
            <Link to='/contact'>
               Contact Our Support Team
            </Link>
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
