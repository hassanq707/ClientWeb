import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPayment = ({ price, customerInfo, vehicleType, onSuccess, onClose }) => {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  useEffect(() => {
    if (!paypalClientId) {
      console.error('PayPal Client ID is missing');
      setError('Payment configuration error. Please try again later.');
    }
  }, [paypalClientId]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: price.toFixed(2),
          currency_code: 'USD'
        },
        description: `${vehicleType} Vehicle Report`,
        custom_id: `${vehicleType}_REPORT_${Date.now()}`,
      }],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
      }
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      console.log('Payment completed:', order);

      onSuccess({
        paymentId: order.id,
        payerEmail: order.payer.email_address,
        payerName: `${order.payer.name.given_name} ${order.payer.name.surname}`,
        amount: price,
        vehicleType,
        customerInfo
      });

      setPaid(true);
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (err) {
      console.error('Payment capture error:', err);
      setError('Payment processing failed. Please try again.');
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
    <PayPalScriptProvider 
      options={{ 
        'client-id': paypalClientId,
        currency: 'USD',
        intent: 'capture',
        components: 'buttons',
      }}
    >
      <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
        {paid ? (
          <div className="text-center">
            <div className="text-green-600 font-medium mb-2">
              Payment successful!
            </div>
            <p className="text-gray-600">Your {vehicleType} report will be generated shortly.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <h4 className="font-medium text-lg mb-1">Pay with PayPal</h4>
              <p className="text-gray-600">Total: ${price.toFixed(2)}</p>
            </div>

            <PayPalButtons
              style={{
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'paypal',
                height: 48
              }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={(err) => {
                console.error('PayPal error:', err);
                setError('An error occurred during payment processing. Please try again.');
              }}
              onCancel={() => {
                setError('Payment was cancelled. You can try again if you wish.');
              }}
            />

            <div className="mt-4 text-center text-sm text-gray-500">
              You’ll be redirected to PayPal to complete your payment securely.
            </div>
          </>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
