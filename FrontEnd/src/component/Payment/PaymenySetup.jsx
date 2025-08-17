import { useState, useEffect } from 'react';
import StripePayment from './StripePayment';
import PaypalPayment from './PaypalPayment';
import axios from 'axios';

const PaymentStep = ({ price, setStep }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    if (paymentMethod === 'stripe') {
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
    }
  }, [price, paymentMethod]);

  const handlePaymentSuccess = async (paymentData) => {
    try {
      const orderData = JSON.parse(localStorage.getItem('orderData'));

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders/payment`,
        {
          orderId: orderData._id,
          transactionId: paymentData.paymentId,
          amount: price,
          paymentMethod: paymentMethod 
        }
      );

      const updatedOrder = {
        ...response.data.order,
        paymentMethod,
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

      {!paymentMethod ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setPaymentMethod('stripe')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col items-center">
              <img src="https://cdn.worldvectorlogo.com/logos/stripe-4.svg" alt="Stripe" className="h-8 mb-2" />
              <span>Pay with Card</span>
            </div>
          </button>
          <button
            onClick={() => setPaymentMethod('paypal')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col items-center">
              <img src="https://cdn.worldvectorlogo.com/logos/paypal-3.svg" alt="PayPal" className="h-8 mb-2" />
              <span>Pay with PayPal</span>
            </div>
          </button>
        </div>
      ) : paymentMethod === 'stripe' ? (
        clientSecret ? (
          <div className="min-h-[300px]">
            <StripePayment
              price={price}
              clientSecret={clientSecret}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p>Loading payment gateway...</p>
          </div>
        )
      ) : (
        <div className="min-h-[300px]">
          <PaypalPayment
            price={price}
            onSuccess={handlePaymentSuccess}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentStep;