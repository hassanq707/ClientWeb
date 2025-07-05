import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packages } from '../../constant/Packages';
import PackageCard from '../../component/UI/Card';
import PaymentModal from '../../component/Payment/PaymentModal';

const Packages = () => {
  const [modalState, setModalState] = useState({
    show: false,
    vehicleType: '',
    price: 0
  });

  const openModal = (vehicleType, price) => {
    setModalState({
      show: true,
      vehicleType,
      price
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, show: false }));
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 -mt-4 md:-mt-2 via-white to-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Premium <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Vehicle Reports</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Comprehensive vehicle history with our exclusive limited-time discounts
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4
              }
            }
          }}
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { 
                  y: 0, 
                  opacity: 1,
                  transition: { 
                    type: "spring", 
                    stiffness: 100,
                    damping: 15
                  }
                }
              }}
            >
              <PackageCard
                vehicleType={pkg.vehicleType}
                price={pkg.price}
                discount={pkg.discount}
                features={pkg.features}
                isPopular={pkg.popular}
                onGetReport={() => openModal(pkg.vehicleType, pkg.price * (1 - pkg.discount / 100))}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {modalState.show && (
          <PaymentModal
            show={modalState.show}
            onClose={closeModal}
            vehicleType={modalState.vehicleType}
            price={modalState.price}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Packages;