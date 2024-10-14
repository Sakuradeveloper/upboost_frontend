import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Box, Button, Typography } from "@mui/material";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://example.com/payment-success',  // Redirect URL after success
      },
    });

    if (result.error) {
      setErrorMessage(result.error.message || "支払い中にエラーが発生しました。");
    }
    console.log("success")

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <Typography color="error" mt={2}>{errorMessage}</Typography>}
      <Button
        type="submit"
        fullWidth
        disabled={!stripe || isProcessing}
        sx={{
          marginTop: 3,
          backgroundColor: isProcessing ? '#ddd' : '#1976d2',
          color: '#fff',
          '&:hover': { backgroundColor: '#1565c0' },
          padding: 1,
          borderRadius: 2,
        }}
      >
        {isProcessing ? '処理中...' : '支払いを送信'}
      </Button>
    </form>
  );
};

export default CheckoutForm;
