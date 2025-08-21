import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { FaSpinner } from 'react-icons/fa';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripeForm = ({ price, clientSecret, onSuccess }) => {
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
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: 'if_required'
      });


      if (stripeError) throw stripeError;

      onSuccess({
        paymentId: paymentIntent.id,
        amount: price,
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
<PaymentElement
        options={{
          layout: { type: 'tabs', defaultCollapsed: false },
          defaultValues: {
            billingDetails: {
              phone: '',      
              address: {
                country: 'US'     
              }
            }
          },
          phoneNumberCollection: {
            enabled: true
          }
        }}
        className="p-3 border border-gray-300 rounded-md"
      /> 
{/* 
      <PaymentElement
        options={{
          layout: { type: 'tabs', defaultCollapsed: false },
          defaultValues: {
            billingDetails: {
              name: '',
              email: '',
              phone: '',
              address: {
                line1: '',
                city: '',
                state: '',
                postal_code: '',
                country: 'US'
              }
            }
          },
          billingDetails: {
            name: 'required',
            email: 'required',
            address: 'required'
          },
          phoneNumberCollection: { enabled: true },
        }}
        className="p-3 border border-gray-300 rounded-md"
      />
 */}

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

const StripePayment = ({ price, clientSecret, onSuccess }) => (
  <Elements stripe={stripePromise} options={{ clientSecret }}>
    <StripeForm
      price={price}
      clientSecret={clientSecret}
      onSuccess={onSuccess}
    />
  </Elements>
);

export default StripePayment;
