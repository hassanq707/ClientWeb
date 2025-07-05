import { useState, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import OrderSlip from './OrderSlip';
import { useNavigate } from 'react-router-dom';

const PaymentModal = ({ show, onClose, vehicleType, price }) => {
  const [step, setStep] = useState('form');
  const [{data}, setData] = useState(JSON.parse(localStorage.getItem("orderData")) || {})
  const [customerInfo, setCustomerInfo] = useState({
    fullname: data?.fullname || '',
    vinNumber: data?.vinNumber || '',
    vehicleModel: data?.vehicleModel || '',
    year: data?.year || '',
    email: data?.email || '',
    phoneNumber: data?.phoneNumber || ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  const handleClose = () => {
    if (step !== "form") {
      setStep("form");
      navigate('/');
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 mx-4 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {step === 'form' 
              ? `Get Your ${vehicleType} Report` 
              : 'Order Confirmation'}
          </h3>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-3xl transition-colors"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="transition-all duration-300">
          {step === 'form' ? (
            <CustomerForm
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
              setStep={setStep}
              vehicleType={vehicleType}
              price={price}
            />
          ) : (
            <OrderSlip
              vehicleType={vehicleType}
              price={price}
              customerInfo={customerInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;  