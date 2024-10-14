import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    setIsProcessing(true);
    
    // Confirm payment using the `elements` instance and `stripe.confirmPayment`
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://example.com/payment-success',  // Redirect URL after success
      },
    });

    if (result.error) {
      // Show error to customer (for example, payment details are incomplete)
      setErrorMessage("result?.error?.message");
    } else {
      // The customer will be redirected to the `return_url` if the payment succeeds
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <button disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processing...' : 'Submit Payment'}
      </button>
    </form>
  );
};

export default CheckoutForm;
