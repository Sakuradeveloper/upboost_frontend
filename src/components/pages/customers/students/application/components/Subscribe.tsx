import { setCurrentItemValue } from "@/store/features/lesson_application";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, FormControl, FormHelperText, FormLabel, Radio, RadioGroup, TextField, Typography, CircularProgress, FormControlLabel } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from "react";
import { postRequest } from "@/utils/axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "@/contexts/AuthContext";

const stripePromise = loadStripe('pk_test_51Q8aCCBFXHZzE4HbQkdlcIc9yAg7bjgkbyoeCMgchyRuHsfLTyVJpO0yUCNh2Ewty9h5XKoHOtJuoobwevlDYuLN00Ty1eKyKD', {
  locale: 'ja',  // Set locale here
});

interface PaymentProps {
  handleTab: (value: string) => void;
}

const Payment: React.FC<PaymentProps> = ({ handleTab }) => {
  const dispatch = useAppDispatch();
  const {user} = useAuth();
  const result = useAppSelector((state) => state.lesson_application.item);
  const [clientSecret, setClientSecret] = useState('');
  const [duration, setDuration] = useState('3_month'); // Default duration
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClientSecret();
  }, [duration, user, dispatch]);

  const fetchClientSecret = async () => {
    setLoading(true);
    try {
      const response = await postRequest(`v0/student/create-subscription/`, {
        duration: '3_month',
        apply_info: result.form,
        user_email: user?.email,
      });
      console.log("response.data : ", response.data);
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Error submitting test:', error);
    }
    setLoading(false);
  };

  const options = {
    clientSecret,
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', borderRadius: 2, boxShadow: 2, maxWidth: 600, margin: 'auto' }}>
      {/* <FormControl component="fieldset">
        <FormLabel component="legend">プランを選択してください</FormLabel>
        <RadioGroup
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <FormControlLabel value="1_month" control={<Radio />} label="1ヶ月プラン" />
          <FormControlLabel value="3_month" control={<Radio />} label="3ヶ月プラン" />
          <FormControlLabel value="12_month" control={<Radio />} label="12ヶ月プラン" />
        </RadioGroup>
        <FormHelperText>プランを選択してください</FormHelperText>
      </FormControl> */}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
          <CircularProgress />
          <Typography ml={2}>読み込み中...</Typography>
        </Box>
      ) : clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <Typography>支払いオプションを読み込んでいます...</Typography>
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
      </Box>
    </Box>
  );
};

export default Payment;
