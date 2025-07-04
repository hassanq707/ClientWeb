// InfoSection.jsx
import { FaCar, FaMotorcycle, FaTruck, FaShip } from 'react-icons/fa';

const InfoSection = ({ currentTypeIndex, currentText }) => {
  const getVehicleIcon = () => {
    const vehicleTypes = ['Car', 'Bike', 'Truck', 'Ship'];
    switch (vehicleTypes[currentTypeIndex]) {
      case 'Car': return <FaCar className="text-blue-600 text-3xl sm:text-4xl md:text-5xl" />;
      case 'Bike': return <FaMotorcycle className="text-blue-600 text-3xl sm:text-4xl md:text-5xl" />;
      case 'Truck': return <FaTruck className="text-blue-600 text-3xl sm:text-4xl md:text-5xl" />;
      case 'Ship': return <FaShip className="text-blue-600 text-3xl sm:text-4xl md:text-5xl" />;
      default: return <FaCar className="text-blue-600 text-3xl sm:text-4xl md:text-5xl" />;
    }
  };

  return (
    <div className="text-white px-2 text-left w-full">
      <div className="flex  justify-start items-center mb-4 sm:mb-6">
        {getVehicleIcon()}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold ml-3 sm:ml-4">Asset</h1>
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6">Central Report</h2>
      <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8">
        Instant reports for your <span className="text-blue-400 font-medium">{currentText}</span>
      </p>
      <ul className="space-y-2 sm:space-y-3 text-md  md:text-lg lg:text-xl">
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full me-3 sm:me-4 flex-shrink-0"></span>
          Accident & Damage History
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full me-3 sm:me-4 flex-shrink-0"></span>
          Ownership Records
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full me-3 sm:me-4 flex-shrink-0"></span>
          Service History
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full me-3 sm:me-4 flex-shrink-0"></span>
          Title Verification
        </li>
      </ul>
    </div>
  );
};

export default InfoSection;