import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPayment = ({ price, onSuccess, onClose }) => {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  useEffect(() => {
    if (!paypalClientId) {
      setError('Payment configuration error. Please try again later.');
    }
  }, [paypalClientId]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price.toFixed(2),
            currency_code: 'USD',
          },
          description: 'Vehicle Report Payment',
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
      },
    });
  };

  const onApprove = async (data, actions) => {
  try {
    const order = await actions.order.capture();
    onSuccess({
      paymentId: order.id, 
      gateway: 'paypal', 
      amount: price, 
      rawData: order
    });
    setPaid(true);
  } catch (err) {
    setError('Payment failed. Please try again.');
  }
};

  if (error) {
    return (
      <div className="p-4 border border-red-300 rounded-md bg-red-50 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ 'client-id': paypalClientId, currency: 'USD' }}>
      <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
        {paid ? (
          <div className="text-center text-green-600 font-medium">
            Payment successful! Redirecting...
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <h4 className="font-medium text-lg">Pay with PayPal</h4>
              <p className="text-gray-600">Total: ${price.toFixed(2)}</p>
            </div>
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={() => setError('Payment error. Try again.')}
              onCancel={() => setError('Payment cancelled.')}
            />
          </>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;