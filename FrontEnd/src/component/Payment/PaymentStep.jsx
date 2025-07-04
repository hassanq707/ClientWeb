import { useState } from 'react';
import PayPalPayment from './PayPalPayment';
import { FaArrowLeft } from 'react-icons/fa';

const PaymentStep = ({ customerInfo, price, vehicleType, onClose, setStep }) => {
  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const handlePaymentSuccess = async (paymentData) => {
    try {
      const orderData = {
        ...customerInfo,
        vehicleType,
        price,
        paymentMethod,
        paymentData
      };

      const response = await fetch('http://localhost:5000/save-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = `/paymentsuccess`;
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      alert(`Payment failed: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Complete Your Payment</h3>
        <p className="text-gray-600 mt-1">Total Amount: ${price}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Select Payment Method</h4>
        <div className="flex justify-center">
          <button
            onClick={() => setPaymentMethod('paypal')}
            className={`px-6 py-3 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all 
              ${paymentMethod === 'paypal' ? 
                'border-blue-500 bg-blue-50 text-blue-600' : 
                'border-gray-300 hover:border-blue-300'}`}
          >
            <span className="font-medium">Payment</span>
          </button>
        </div>
      </div>

      <div className="mt-8">
        {paymentMethod === 'paypal' && (
          <PayPalPayment 
            price={price}
            customerInfo={customerInfo}
            vehicleType={vehicleType}
            onSuccess={handlePaymentSuccess}
            onClose={onClose}
          />
        )}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => setStep('form')}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          <FaArrowLeft className="mr-1" />
          Back to form
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;
