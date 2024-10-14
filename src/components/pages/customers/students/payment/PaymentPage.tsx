import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import CheckoutForm from './sections/CheckoutForm';  // Path to your CheckoutForm component
import { postRequest } from '@/utils/axios';
import { Typography, Box } from '@mui/material';

// Initialize Stripe
// const stripePromise = loadStripe('pk_test_51Q8aCCBFXHZzE4HbQkdlcIc9yAg7bjgkbyoeCMgchyRuHsfLTyVJpO0yUCNh2Ewty9h5XKoHOtJuoobwevlDYuLN00Ty1eKyKD');  // Replace with your public key
const stripePromise = loadStripe('pk_test_51Q8aCCBFXHZzE4HbQkdlcIc9yAg7bjgkbyoeCMgchyRuHsfLTyVJpO0yUCNh2Ewty9h5XKoHOtJuoobwevlDYuLN00Ty1eKyKD', {
  locale: 'ja',  // Set locale here
});
const ProgressPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const amount = 1000;

  useEffect(() => {
    fetchClientSecret();
  }, []);

  const fetchClientSecret=async()=>{
    try {
      const response = await postRequest(`v0/student/create-payment-intent/`, {
        amount : amount,
      });
      console.log("response.data : ", response.data)
      setClientSecret(response.data.clientSecret)
    } catch (error) {
      console.error('Error submitting test:', error);
    }
    // const res = await postRequest('v0/student/create-payment-intent/', {amount})
  }

  const options = {
    clientSecret,
  };

  return (
    <Box>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <Typography>支払いオプションを読み込んでいます...</Typography>
      )}
    </Box>
  );
};

export default ProgressPage;
