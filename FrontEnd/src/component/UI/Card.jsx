import { motion } from 'framer-motion';
import { FaCar, FaShip, FaTruck, FaCheck } from 'react-icons/fa';
import { RiEBikeFill } from 'react-icons/ri';

const vehicleIcons = {
  Bike: RiEBikeFill,
  Car: FaCar,
  Truck: FaTruck,
  Ship: FaShip
};

const PackageCard = ({ 
  vehicleType, 
  price, 
  discount, 
  features, 
  onGetReport,
  isPopular = false 
}) => {
  const discountedPrice = price * (1 - discount / 100);
  const IconComponent = vehicleIcons[vehicleType] || FaCar;

  return (
    <motion.div 
      className="relative h-full"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      {isPopular && (
        <motion.div 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          MOST POPULAR
        </motion.div>
      )}
      
      <motion.div
        className={`h-full flex flex-col rounded-2xl overflow-hidden shadow-lg`}
        whileTap={{ scale: 0.98 }}
      >
        {/* Card Header */}
        <div className={`p-4 ${
          isPopular ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-blue-500'
        } text-white text-center`}>
          <motion.div 
            className="flex justify-center mb-3"
            whileHover={{ rotate: 10 }}
          >
            <div className="p-3 rounded-full w-16 h-16 flex items-center justify-center bg-white/20">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h3 className="text-xl sm:text-2xl font-bold">{vehicleType} Report</h3>
        </div>
        
        {/* Price Section */}
        <motion.div 
          className="px-4 sm:px-6 pt-5 pb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">${discountedPrice.toFixed(2)}</span>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg text-gray-500 line-through">${price.toFixed(2)}</span>
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                {discount}% OFF
              </span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">One-time payment</p>
        </motion.div>
        
        {/* Features List */}
        <div className="px-4 sm:px-6 py-3 flex-grow">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <FaCheck className="flex-shrink-0 h-4 w-4 text-green-500 mr-3 mt-1" />
                <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        {/* CTA Button */}
        <div className="px-4 sm:px-6 pb-6 pt-3">
          <motion.button
            onClick={onGetReport}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white text-sm sm:text-base ${
              isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } shadow-md`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Get {vehicleType} Report
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PackageCard;