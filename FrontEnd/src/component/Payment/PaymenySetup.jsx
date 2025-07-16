import { useState } from 'react';
import PayPalPayment from './PaypalPayment';
import axios from 'axios';
import StripePayment from './StripePayment';

const PaymentStep = ({ price, vehicleType, onClose, setStep }) => {
  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const handlePaymentSuccess = async (paymentData) => {
    try {
      const orderData = JSON.parse(localStorage.getItem('orderData'));

      if (!paymentData?.paymentId || !paymentData?.gateway) {
        throw new Error('Invalid payment data received');
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders/payment`,
        {
          orderId: orderData._id,
          paymentMethod: paymentData.gateway,
          transactionId: paymentData.paymentId,
          amount: `${paymentData.amount.toFixed(2)}$`
        }
      );
      const updatedOrder = {
        ...response.data.order,
        paymentMethod: paymentData.gateway,
      }
      localStorage.setItem('orderData', JSON.stringify(updatedOrder));
      setStep('success');
    } catch (error) {
      console.error('Payment failed:', error);
      alert(`Payment failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold">Complete Payment</h3>
        <p className="text-gray-600">Total: ${price?.toFixed(2)}</p>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setPaymentMethod('paypal')}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${paymentMethod === 'paypal'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          PayPal
        </button>
        <button
          onClick={() => setPaymentMethod('stripe')}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${paymentMethod === 'stripe'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          Stripe
        </button>
      </div>

      <div className="min-h-[300px]">
        {paymentMethod === 'paypal' ? (
          <PayPalPayment
            price={price}
            onSuccess={handlePaymentSuccess}
          />
        ) : (
          <StripePayment
            price={price}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentStep;