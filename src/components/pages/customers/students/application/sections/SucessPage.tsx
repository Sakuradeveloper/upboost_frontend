import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('');

  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent');
    const clientSecret = searchParams.get('payment_intent_client_secret');

    if (paymentIntent && clientSecret) {
      // Optionally validate the payment status with the backend
      setStatus('Payment was successful!');
    } else {
      setStatus('Payment failed or was canceled.');
    }
  }, [searchParams]);

  return (
    <div>
      <h1>{status}</h1>
    </div>
  );
};

export default PaymentSuccess;
