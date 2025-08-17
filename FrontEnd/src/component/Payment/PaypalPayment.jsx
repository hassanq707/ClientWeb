import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalPayment = ({ price, onSuccess }) => {
  const [error, setError] = useState(null);
  const [orderID, setOrderID] = useState(null);
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  const createOrder = async (data, actions) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders/create-paypal-order`,
        { amount: price }
      );
      setOrderID(response.data.id);
      return response.data.id;
    } catch (err) {
      setError('Failed to create PayPal order');
      throw err;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      // Verify payment 
      const verification = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders/verify-paypal`,
        { orderID: data.orderID }
      );

      if (verification.data.success) {
        onSuccess({
          paymentId: data.orderID,
          amount: price,
          rawData: verification.data.order
        });
      } else {
        setError('Payment verification failed');
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
  };

  if (!paypalClientId) {
    return (
      <div className="p-4 border border-red-300 rounded-md bg-red-50 text-red-600">
        PayPal configuration error
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        'client-id': paypalClientId,
        currency: 'USD',
        'disable-funding': 'paylater,card'
      }}
    >
      <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
        {error ? (
          <div className="text-center text-red-600 font-medium mb-4">
            {error}
          </div>
        ) : (
          <div className="text-center mb-4">
            <h4 className="font-medium text-lg">Pay with PayPal</h4>
            <p className="text-gray-600">Total: ${price.toFixed(2)}</p>
          </div>
        )}
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={() => setError('Payment processing error')}
          onCancel={() => setError('Payment cancelled')}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;