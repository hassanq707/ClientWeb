import { FaCar, FaMotorcycle, FaTruck, FaShip, FaShieldAlt, FaGlobe, FaChartLine, FaCertificate } from 'react-icons/fa';
import { IoMdSpeedometer } from 'react-icons/io';
import { GiCarKey } from 'react-icons/gi';

const InfoSection = ({ currentTypeIndex, currentText }) => {
  const getVehicleIcon = () => {
    const vehicleTypes = ['Car', 'Bike', 'Truck', 'Ship'];
    switch (vehicleTypes[currentTypeIndex]) {
      case 'Car': return <FaCar className="text-blue-400 text-4xl sm:text-5xl" />;
      case 'Bike': return <FaMotorcycle className="text-blue-400 text-4xl sm:text-5xl" />;
      case 'Truck': return <FaTruck className="text-blue-400 text-4xl sm:text-5xl" />;
      case 'Ship': return <FaShip className="text-blue-400 text-4xl sm:text-5xl" />;
      default: return <FaCar className="text-blue-400 text-4xl sm:text-5xl" />;
    }
  };

  return (
    <div className="text-white px-2 mt-0 md:mt-6 md:px-6 lg:px-10 text-left w-full">
      <div className="flex items-center mb-6">
        {getVehicleIcon()}
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300">
          <span className="text-white">Assist <span className='text-blue-400'>Central</span> Report</span>
        </h1>
      </div>
      <p className="text-xl md:text-2xl mb-8">
        Instant verification for your <span className="text-blue-300 font-medium">{currentText}</span>
      </p>
      
      <ul className="space-y-3 md:space-y-4 text-lg md:text-xl">
        <li className="flex items-start">
          <FaShieldAlt className="text-blue-400 text-xl mt-1 mr-3 flex-shrink-0" />
          <span className='text-lg'>Accident & Damage History with severity analysis</span>
        </li>
        <li className="flex items-start">
          <GiCarKey className="text-blue-400 text-xl mt-1 mr-3 flex-shrink-0" />
          <span className='text-lg'>Complete ownership records & title verification</span>
        </li>
        <li className="flex items-start">
          <IoMdSpeedometer className="text-blue-400 text-xl mt-1 mr-3 flex-shrink-0" />
          <span className='text-lg'>Mileage verification to detect rollback fraud</span>
        </li>
        <li className="flex items-start">
          <FaCertificate className="text-blue-400 text-xl mt-1 mr-3 flex-shrink-0" />
          <span className='text-lg'>Certified reports accepted by dealers worldwide</span>
        </li>
      </ul>

      <div className="mt-10 flex flex-wrap gap-4">
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-400/30">
          <div className="text-blue-300 font-bold text-xl">10M+</div>
          <div className="text-sm">Records</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-400/30">
          <div className="text-blue-300 font-bold text-xl">98%</div>
          <div className="text-sm">Accuracy</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-400/30">
          <div className="text-blue-300 font-bold text-xl">24/7</div>
          <div className="text-sm">Support</div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;