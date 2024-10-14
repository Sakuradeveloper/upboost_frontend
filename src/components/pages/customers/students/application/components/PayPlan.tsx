import { setCurrentItemValue } from "@/store/features/lesson_application";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface PayPlanProps {
  handleTab: (value: string) => void;
}

const PayPlan: React.FC<PayPlanProps> = ({ handleTab }) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector((state) => state.lesson_application.item);

  return (
    <Box 
      sx={{ 
        padding: 4, 
        backgroundColor: '#f4f6f8', 
        borderRadius: 2, 
        boxShadow: 2, 
      }}
    >
      <FormControl component="fieldset" sx={{ marginBottom: 4 }} error={Boolean(result.errors.payment)} required>
        <FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>
          お支払回数は、どちらを希望しますか？ *
        </FormLabel>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2, lineHeight: '1.5' }}>
          ・一括で複数月分をお支払いの場合、返金はいたしかねます。<br />
          ・月2回プランは割引対象外です。<br />
          ・月の途中でレッスンが開始された場合、実施されたレッスン数に基づいて合計割引が算出されます。<br />
          ・休会や退会、お支払変更のご連絡がない場合、お支払いは初回と同じ頻度で更新月に自動的に行われます。<br />
        </Typography>
        <RadioGroup
          aria-label="payment"
          name="payment"
          value={result.form.payment}
          onChange={(e) => dispatch(setCurrentItemValue({ payment: e.target.value }))}
        >
          <FormControlLabel value="1_month" control={<Radio />} label="月払い" />
          <FormControlLabel value="3_month" control={<Radio />} label="3ヶ月一括払い[※毎月300円割引、合計900円割引]" />
          <FormControlLabel value="6_month" control={<Radio />} label="6ヶ月一括払い[※毎月500円割引、合計3,000円割引]" />
          <FormControlLabel value="12_month" control={<Radio />} label="12ヶ月一括払い[※毎月750円割引、合計9,000円割引]" />
        </RadioGroup>
        {result.errors.payment && (
          <FormHelperText error sx={{ color: 'error.main', marginTop: 1 }}>
            必須です。
          </FormHelperText>
        )}
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => handleTab('3')} 
          sx={{ borderRadius: '20px', width: '45%', color: '#1976d2', borderColor: '#1976d2', '&:hover': { borderColor: '#1565c0' } }}
        >
          戻る
        </Button>
        <Button 
          variant="contained" 
          endIcon={<ArrowForwardIcon />} 
          onClick={() => handleTab('5')} 
          sx={{ borderRadius: '20px', width: '45%', backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0' }}}
        >
          続行
        </Button>
      </Box>
    </Box>
  );
};

export default PayPlan;
