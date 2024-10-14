import { setCurrentItemValue } from "@/store/features/lesson_application";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, FormControl, FormHelperText, FormLabel, Radio, RadioGroup, TextField, Typography, CircularProgress  } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import { useEffect, useState } from "react";
import { postRequest } from "@/utils/axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51Q8aCCBFXHZzE4HbQkdlcIc9yAg7bjgkbyoeCMgchyRuHsfLTyVJpO0yUCNh2Ewty9h5XKoHOtJuoobwevlDYuLN00Ty1eKyKD', {
  locale: 'ja',  // Set locale here
});

interface PaymentProps {
  handleTab: (value: string) => void;
}

const Payment: React.FC<PaymentProps> = ({ handleTab }) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector((state) => state.lesson_application.item);
  const [clientSecret, setClientSecret] = useState('');
  const amount=1000;
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
    <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', borderRadius: 2, boxShadow: 2, maxWidth: 600, margin: 'auto' }}>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
          <Typography ml={2}>支払いオプションを読み込んでいます...</Typography>
        </Box>
      )}

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => handleTab('5')}
          sx={{
            borderRadius: '20px',
            width: '45%',
            color: '#1976d2',
            borderColor: '#1976d2',
            '&:hover': { borderColor: '#1565c0' }
          }}
        >
          戻る
        </Button>
        {/* <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => handleTab('6')}
          sx={{
            borderRadius: '20px',
            width: '45%',
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': { backgroundColor: '#1565c0' }
          }}
        >
          続行
        </Button> */}
      </Box>
    </Box>
  );
};

export default Payment;