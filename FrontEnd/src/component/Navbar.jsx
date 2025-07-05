import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiInfo, FiPackage, FiMail } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'About', path: '/about', icon: <FiInfo /> },
    { name: 'Packages', path: '/package', icon: <FiPackage /> },
    { name: 'Contact', path: '/contact', icon: <FiMail /> },
  ];

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const mobileItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={`hidden md:block fixed w-full z-50 transition-all duration-300 ${scrolled
          ? 'bg-white shadow-lg border-b border-gray-100 py-2'
          : 'bg-white/90 backdrop-blur-md py-2'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={isMounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/" className="flex items-center group">
                <img src="/logo.png"className="h-16 w-16 text-blue-600 transition-transform group-hover:scale-110" />
                <span className="ml-1 text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                  Fusions Car<span className="text-blue-600"></span>
                </span>
              </Link>
            </motion.div>

            <motion.div
              className="flex items-center space-x-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item, index) => (
                <motion.div key={item.name} variants={itemVariants} custom={index}>
                  <Link
                    to={item.path}
                    className={`relative text-md font-medium transition-colors ${path === item.path
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-500'
                      }`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-2 left-1/2 h-[3px] bg-blue-600 rounded-full transition-transform duration-300 ease-out ${path === item.path
                        ? 'w-full scale-x-100 -translate-x-1/2 origin-center'
                        : 'w-0 scale-x-0'
                        }`}
                    ></span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.div
        className="md:hidden fixed w-full z-50 top-0"
        initial={{ opacity: 0, y: -20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className={`flex items-center justify-between px-4 h-16 transition-all ${scrolled ? 'bg-white shadow-sm' : 'bg-white/90 backdrop-blur-sm'}`}>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={isMounted ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/" className="flex items-center">
              <img src="/logo.png"className="h-16 w-16 text-blue-600 transition-transform group-hover:scale-110" />
                <span className="ml-1 text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                  Fusions Car<span className="text-blue-600"></span>
                </span>
            </Link>
          </motion.div>

          <motion.button
            initial={{ y: -20, opacity: 0 }}
            animate={isMounted ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            className="bg-white shadow-lg border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={mobileItemVariants}
                  custom={index}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-6 py-4 text-md ${path === item.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom Navigation for Mobile */}
      <motion.div
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg ${mobileMenuOpen ? 'hidden' : 'block'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex justify-around">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ y: -20, opacity: 0 }}
              animate={isMounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`flex flex-col items-center justify-center py-3 px-2 w-full ${path === item.path ? 'text-blue-600' : 'text-gray-500'}`}
              >
                <div className="text-xl mb-1">
                  {React.cloneElement(item.icon, {
                    className: `text-${path === item.path ? 'blue-600' : 'gray-500'}`
                  })}
                </div>
                <span className="text-xs">{item.name}</span>
                {path === item.path && (
                  <div className="w-1/2 h-1 bg-blue-600 rounded-t-full mt-1"></div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
