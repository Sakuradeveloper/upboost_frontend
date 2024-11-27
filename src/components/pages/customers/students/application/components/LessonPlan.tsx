import { setCurrentItemValue } from "@/store/features/lesson_application";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LessonPlan: React.FC<{ handleTab: (value: string) => void }> = ({ handleTab }) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector((state) => state.lesson_application.item);

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', borderRadius: 2, boxShadow: 2 }}>
      <FormControl component="fieldset" error={Boolean(result.errors.plan)} sx={{ marginBottom: 3 }} required>
        <FormLabel component="legend" sx={{ fontWeight: 'bold', marginBottom: 1, fontSize: '1.25rem', color: '#333' }}>
          どのプランを希望しますか？ [各レッスンは60分間となっております]
        </FormLabel>
        <RadioGroup 
          value={result.form.plan} 
          name="plan" 
          onChange={e => dispatch(setCurrentItemValue({ plan: e.target.value, otherPlan: '' }))} 
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          {["4", "6", "8", "10", "12"].map((plan, index) => (
            <FormControlLabel 
              key={plan} 
              value={plan} 
              control={<Radio sx={{ color: '#1976d2', '&.Mui-checked': { color: '#1976d2' } }} />} 
              label={`月${(index + 2) * 2}回 ${index === 0 ? '6,600円(税込)' : (index === 1 ? '12,800円(税込)' : (index === 2 ? '25,200円(税込)' : (index === 3 ? '37,200円(税込)' : '48,800円(税込)')))} | 月額`} 
            />
          ))}
          <FormControlLabel
            value="other"
            control={<Radio sx={{ color: '#1976d2', '&.Mui-checked': { color: '#1976d2' } }} />}
            label={
              <TextField
                placeholder="Other"
                value={result.form.otherPlan}
                name="otherPlan"
                onChange={e => dispatch(setCurrentItemValue({ otherPlan: e.target.value }))}
                sx={{
                  marginLeft: 1,
                  marginTop: '-8px',
                  '& .MuiInputBase-root': {
                    '& input': {
                      border: 'none',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                      transition: 'border-color 0.3s',
                      '&:hover:not(.Mui-disabled):before': {
                        borderBottom: '2px solid rgba(0, 0, 0, 0.87)',
                      },
                      '&:focus': {
                        borderBottom: '2px solid #298904',
                        outline: 'none',
                      },
                    },
                  },
                }}
                InputProps={{
                  style: { borderRadius: 0 },
                  disableUnderline: true,
                }}
                variant="standard"
                disabled={result.form.plan !== 'other'}
                error={result.form.plan === 'other' && Boolean(result.errors.otherPlan)}
              />
            }
          />
        </RadioGroup>
        {result.errors.otherPlan && (
          <FormHelperText error>
            必須です。
          </FormHelperText>
        )}
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => handleTab('1')} 
          sx={{ borderRadius: '20px', width: '45%', color: '#1976d2', borderColor: '#1976d2', '&:hover': { borderColor: '#1565c0' } }}
        >
          戻る
        </Button>
        <Button 
          variant="contained" 
          endIcon={<ArrowForwardIcon />} 
          onClick={() => handleTab('3')} 
          sx={{ borderRadius: '20px', width: '45%', backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0' }}}
        >
          続行
        </Button>
      </Box>
    </Box>
  );
};

export default LessonPlan;
