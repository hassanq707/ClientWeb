import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiInfo, FiPackage, FiMail } from 'react-icons/fi';
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
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 10 },
    },
  };

  const mobileItemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={`hidden md:block fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-blue-100 py-2'
            : 'bg-white/90 backdrop-blur-lg py-3'
        }`}
      >

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={isMounted ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link to="/" className="flex items-center group relative">
                <motion.img
                  src="/logo.png"
                  className="h-16 w-16 relative z-10 transition-all duration-300 group-hover:drop-shadow-lg"
                  whileHover={{ rotate: 5 }}
                />
                <span className="ml-2 text-2xl font-black text-gray-800 tracking-tight">
                  Fusions Car
                </span>
              </Link>
            </motion.div>

            {/* NavLinks */}
            <motion.div
              className="flex items-center space-x-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item, index) => (
                <motion.div key={item.name} variants={itemVariants} custom={index}>
                  <Link
                    to={item.path}
                    className={`relative px-6 py-3 mx-1 text-md font-semibold transition-all duration-300 rounded-xl group ${
                      path === item.path
                        ? 'text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80'
                    }`}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                    <span className="relative z-10">{item.name}</span>

                    {path === item.path && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
                        layoutId="activeIndicator"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ x: '-50%' }}
                      />
                    )}
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
        <div
          className={`flex items-center justify-between px-4 h-16 transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-xl shadow-xl'
              : 'bg-white/90 backdrop-blur-lg'
          }`}
        >
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={isMounted ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/" className="flex items-center group">
              <motion.img
                src="/logo.png"
                className="h-14 w-14 transition-all duration-300 group-hover:drop-shadow-md"
              />
              <span className="ml-2 text-xl font-black text-gray-900 tracking-tight">
                Fusions Car
              </span>
            </Link>
          </motion.div>

          <motion.button
            initial={{ x: 30, opacity: 0 }}
            animate={isMounted ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 rounded-xl text-gray-700 hover:bg-blue-50 focus:outline-none transition-all duration-200 relative group"
          >
            <motion.svg
              className="h-6 w-6 relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </motion.button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            className="bg-white/95 backdrop-blur-xl shadow-2xl border-t border-blue-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="py-2"
            >
              {navItems.map((item, index) => (
                <motion.div key={item.name} variants={mobileItemVariants} custom={index} whileHover={{ x: 5 }}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-6 py-4 text-md font-medium transition-all duration-200 relative group ${
                      path === item.path
                        ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 border-r-4 border-blue-600'
                        : 'text-gray-700 hover:bg-blue-50/50 hover:text-blue-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.name}
                    </div>
                    {path === item.path && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600"
                        layoutId="mobileActiveIndicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom Navigation for Mobile */}
      <motion.div
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-blue-100 z-40 shadow-2xl ${
          mobileMenuOpen ? 'hidden' : 'block'
        }`}
        initial={{ opacity: 0, y: 100 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      >
        <div className="flex justify-around py-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ y: 50, opacity: 0 }}
              animate={isMounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1, ease: 'easeOut' }}
              className="flex-1"
            >
              <Link
                to={item.path}
                className={`flex flex-col items-center justify-center py-3 px-2 relative transition-all duration-300 group ${
                  path === item.path ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {path === item.path && (
                  <motion.div
                    className="absolute inset-0 bg-blue-100/50 rounded-2xl"
                    layoutId="bottomActiveBackground"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <motion.div
                  className="text-2xl mb-1 relative z-10"
                  whileTap={{ scale: 0.9 }}
                  animate={path === item.path ? { y: [0, -3, 0] } : {}}
                  transition={{
                    duration: 0.5,
                    repeat: path === item.path ? Infinity : 0,
                    repeatDelay: 2,
                  }}
                >
                  {React.cloneElement(item.icon, {
                    className: `${
                      path === item.path
                        ? 'text-blue-600 drop-shadow-sm'
                        : 'text-gray-500 group-hover:text-blue-400'
                    }`,
                  })}
                </motion.div>

                <span
                  className={`text-xs font-medium relative z-10 ${
                    path === item.path ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {item.name}
                </span>

                {path === item.path && (
                  <motion.div
                    className="absolute -top-1 w-2 h-2 bg-blue-600 rounded-full shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  />
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
