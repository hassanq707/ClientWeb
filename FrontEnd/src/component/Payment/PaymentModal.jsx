import { useState, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import PaymentStep from './PaymenySetup';
import { useNavigate } from 'react-router-dom';
import PaymentSuccess from './PaymentSuccess';
import { FaArrowLeft } from 'react-icons/fa';

const PaymentModal = ({ show, onClose, vehicleType, price }) => {
  const [step, setStep] = useState('form');
  const [customerInfo, setCustomerInfo] = useState(() => {
  const {data} = JSON.parse(localStorage.getItem("orderData")) || {};
    return {
      fullname: data?.fullname || '',
      vinNumber: data?.vinNumber || '',
      vehicleModel: data?.vehicleModel || '',
      year: data?.year || '',
      email: data?.email || '',
      phoneNumber: data?.phoneNumber || ''
    };
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [show]);

  const handleClose = () => {
    setStep('form');
    onClose();
    navigate('/');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 mx-4">
        <div className="flex justify-between items-center mb-6 ">
          <h3 className="text-2xl font-bold text-gray-800">
            {step === 'form' ? `Get Your ${vehicleType} Report` :
              step === 'payment' ? 'Order Confirmation' : 'Payment Successful'}
          </h3>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 text-3xl">
            &times;
          </button>
        </div>

        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {step === 'form' && (
            <CustomerForm
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
              setStep={setStep}
              vehicleType={vehicleType}
              price={price}
            />
          )}

          {step === 'payment' && (
            <PaymentStep
              customerInfo={customerInfo}
              price={price}
              vehicleType={vehicleType}
              onClose={handleClose}
              setStep={setStep}
            />
          )}

          {step === 'success' && (
            <PaymentSuccess
              customerInfo={customerInfo}
              vehicleType={vehicleType}
              price={price}
              onClose={handleClose}
            />
          )}

        </div>
         {step !== 'form' &&
           <div className="pt-4">
            <button
              onClick={() => setStep('form')}
              className="text-blue-600 flex items-center text-sm hover:text-blue-800"
              >
              <FaArrowLeft className="mr-2" />
              Back to Form
            </button>
          </div>
            } 
      </div>
    </div>
  );
};

export default PaymentModal;