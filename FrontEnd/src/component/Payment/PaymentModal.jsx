import { useState } from 'react';
import CustomerForm from './CustomerForm';
import PaymentStep from './PaymentStep';
import OrderSlip from './OrderSlip';
import { useNavigate } from 'react-router-dom';

const PaymentModal = ({ show, onClose, vehicleType, price }) => {
  const [step, setStep] = useState('form');
  const [{data}, setData] = useState(JSON.parse(localStorage.getItem("orderData")) || {})
  const [customerInfo, setCustomerInfo] = useState({
    fullname: data.fullname || '',
    vinNumber: data.vinNumber || '',
    vehicleModel: data.vehicleModel || '',
    year: data.year || '',
    email: '',
    phoneNumber: ''
  });

  const navigate = useNavigate()

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">
            {step === 'form'
              ? `Get Your ${vehicleType} Report`
              : `Your Order Slip`}
          </h3>
          <button onClick={() => {
            if (step !== "form") {
              setStep("form");     
              onClose();           
              navigate('/');  
            } else {
              onClose();           
            }
          }}
            className="text-gray-500 hover:text-gray-700 text-4xl -mt-2 leading-none">
            &times;
          </button>
        </div>

        {step === 'form' ? (
          <CustomerForm
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
            setStep={setStep}
            vehicleType={vehicleType}
          />
        ) : (
          <OrderSlip
            vehicleType={vehicleType}
            price={price}
          />
         )}
      </div>
    </div>
  );
};

export default PaymentModal;




