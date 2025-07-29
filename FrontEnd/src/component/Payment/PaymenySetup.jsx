import { useState } from 'react';
import PayPalPayment from './PaypalPayment';
import axios from 'axios';

const PaymentStep = ({ price, vehicleType, onClose, setStep }) => {

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
          paymentMethod: "Paypal",
          transactionId: paymentData.paymentId,
          amount: `${paymentData.amount.toFixed(2)}$`
        }
      );
      const updatedOrder = {
        ...response.data.order,
        paymentMethod: "Paypal",
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


      <div className="min-h-[300px]">
          <PayPalPayment
            price={price}
            onSuccess={handlePaymentSuccess}
          />
      </div>
    </div>
  );
};

export default PaymentStep;