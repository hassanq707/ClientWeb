import { useState, useEffect } from 'react';
import StripePayment from './StripePayment';
import axios from 'axios';

const PaymentStep = ({ price, setStep }) => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/orders/create-payment-intent`,
          { amount: price }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
        alert('Failed to initialize payment');
      }
    };

    fetchClientSecret();
  }, [price]);

  const handleStripeSuccess = async (paymentData) => {
    console.log(paymentData)
    try {
      const orderData = JSON.parse(localStorage.getItem('orderData'));

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders/payment`,
        {
          orderId: orderData._id, 
          transactionId: paymentData.paymentId,
          amount: price, 
        }
      );

      const updatedOrder = {
        ...response.data.order,
        paymentMethod: "stripe",
      };

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

      {clientSecret ? (
        <div className="min-h-[300px]">
          <StripePayment
            price={price}
            clientSecret={clientSecret}
            onSuccess={handleStripeSuccess}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p>Loading payment gateway...</p>
        </div>
      )}
    </div>
  );
};

export default PaymentStep;