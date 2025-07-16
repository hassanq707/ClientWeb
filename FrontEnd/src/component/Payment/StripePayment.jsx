import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { FaSpinner } from 'react-icons/fa';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripeForm = ({ price, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        throw stripeError;
      }

      onSuccess({
        paymentId: paymentMethod.id, // Stripe payment method ID
        gateway: 'stripe', // Explicitly set gateway
        amount: price, // Pass the amount
        rawData: paymentMethod // Full Stripe response
      });

    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-4 border border-gray-200 rounded-lg bg-white">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Card Details
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                '::placeholder': {
                  color: '#a0aec0',
                },
              },
            }
          }}
          className="p-3 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${processing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } flex items-center justify-center`}
      >
        {processing ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            Processing...
          </>
        ) : (
          `Pay $${price.toFixed(2)}`
        )}
      </button>
    </form>
  );
};

const StripePayment = ({ price, onSuccess }) => (
  <Elements stripe={stripePromise}>
    <StripeForm price={price} onSuccess={onSuccess} />
  </Elements>
);

export default StripePayment;