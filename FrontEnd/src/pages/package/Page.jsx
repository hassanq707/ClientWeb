// import { useState } from 'react';
// import PackageCard from '../../component/UI/Card';
// import { packages } from '../../constant/Packages';
// import PaymentModal from '../../component/Payment/PaymentModal';

// const Packages = () => {
//   const [modalState, setModalState] = useState({
//     show: false,
//     vehicleType: '',
//     price: 0
//   });

//   const openModal = (vehicleType, price) => {
//     setModalState({
//       show: true,
//       vehicleType,
//       price
//     });
//   };

//   const closeModal = () => {
//     setModalState(prev => ({ ...prev, show: false }));
//   };

//   return (
//     <div className="bg-gray-100 py-20 px-4 border-2 -mt-1 sm:px-6 lg:px-8">
//       <div className="max-w-7xl pt-12 mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
//             Premium Vehicle Report Packages
//           </h2>
//           <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
//             Get detailed history reports with our exclusive limited-time discounts
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {packages.map((pkg, index) => (
//             <PackageCard
//               key={index}
//               vehicleType={pkg.vehicleType}
//               price={pkg.price}
//               discount={pkg.discount}
//               features={pkg.features}
//               onGetReport={() => openModal(pkg.vehicleType, pkg.price * (1 - pkg.discount / 100))}
//             />
//           ))}
//         </div>
//       </div>

//       <PaymentModal
//         show={modalState.show}
//         onClose={closeModal}
//         vehicleType={modalState.vehicleType}
//         price={modalState.price}
//       />
//     </div>
//   );
// };

// export default Packages;



import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div className="bg-gradient-to-b -mt-3 from-blue-50 to-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Premium Vehicle Report Packages
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Get detailed history reports with our exclusive limited-time discounts
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
              }
            }
          }}
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1 }
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

      <PaymentModal
        show={modalState.show}
        onClose={closeModal}
        vehicleType={modalState.vehicleType}
        price={modalState.price}
      />
    </div>
  );
};

export default Packages;