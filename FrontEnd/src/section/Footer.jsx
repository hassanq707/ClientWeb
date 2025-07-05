import React, { useEffect, useRef } from 'react';
import { footerData } from '../constant/Footer.const';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail} from 'react-icons/md';
import { Link } from 'react-router-dom';

import { motion, useAnimation, useInView } from 'framer-motion';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  const socialIcons = {
    Facebook: <FaFacebook className="text-xl" />,
    Twitter: <FaTwitter className="text-xl" />,
    Instagram: <FaInstagram className="text-xl" />,
    LinkedIn: <FaLinkedin className="text-xl" />
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,  
        delayChildren: 0.1      
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },  
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,  
        ease: "easeOut"
      }
    }
  };

  const columnVariants = {
    hidden: { y: 20, opacity: 0 },  
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,  
        ease: "easeOut" 
      }
    }
  };

  const socialVariants = {
    hidden: { scale: 0.8, opacity: 0 },  
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,  
        damping: 15,     
        delay: 0.2       
      }
    }
  };

  return (
    <motion.footer
      ref={ref}
      className="bg-white text-gray-800 border-t border-gray-200 pt-16 pb-8"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Logo and Description */}
          <motion.div
            variants={columnVariants}
          >
            <motion.div
              className="flex -mt-5 items-center gap-4"
              variants={itemVariants}
            >
              <motion.img
                src={footerData.logo}
                width={80}
                height={80}
                alt="Fusions Car Logo"
                className="h-16 w-auto object-contain"
                variants={itemVariants}
              />
              <motion.h2
                className="text-2xl font-bold text-gray-900"
                variants={itemVariants}
              >
                Fusions
                <span className="text-blue-600"> Car</span>
              </motion.h2>
            </motion.div>
            <motion.p
              className="text-gray-600 text-sm mb-4 leading-relaxed"
              variants={itemVariants}
            >
              {footerData.description}
            </motion.p>
            <motion.div
              className="flex space-x-4 pt-2"
              variants={containerVariants}
            >
              {footerData.social.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
                  aria-label={item.name}
                  variants={socialVariants}
                  custom={index}
                  transition={{ delay: index * 0.05 }}
                >
                  {socialIcons[item.name]}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Links Columns */}
          {footerData.links.map((column, index) => (
            <motion.div
              key={column.title}
              className="space-y-4"
              variants={columnVariants}
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              <motion.h3
                className="text-lg font-semibold text-gray-900 uppercase tracking-wider"
                variants={itemVariants}
              >
                {column.title}
              </motion.h3>
              <motion.ul
                className="space-y-3"
                variants={containerVariants}
              >
                {column.items.map((item, i) => (
                  <motion.li
                    key={item.name}
                    variants={itemVariants}
                    custom={i}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 text-sm"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            className="space-y-4"
            variants={columnVariants}
            transition={{ delay: 0.1 }}
          >
            <motion.h3
              className="text-lg font-semibold text-gray-900 uppercase tracking-wider"
              variants={itemVariants}
            >
              Get In Touch
            </motion.h3>
            <motion.address
              className="not-italic text-gray-600 space-y-4"
              variants={containerVariants}
            >

              <motion.div
                className="flex items-center gap-3"
                variants={itemVariants}
              >
                <motion.p
                  className="text-gray-600 text-sm leading-relaxed"
                  variants={itemVariants}
                >
                  {footerData.contact.data}
                </motion.p>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                variants={itemVariants}
              >
                <MdEmail className="text-blue-600" />
                <a
                  className="hover:text-blue-600 transition-colors duration-300 text-sm"
                >
                  {footerData.contact.email}
                </a>
              </motion.div>
            </motion.address>

            <motion.div
              variants={itemVariants}
              transition={{ delay: 0.2 }}  
            >
              <Link
                to="/contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 text-sm"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>

        <motion.div
          className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm"
          variants={itemVariants}
          transition={{ delay: 0.3 }}
        >
          <p>&copy; {new Date().getFullYear()} Fusions Car. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;