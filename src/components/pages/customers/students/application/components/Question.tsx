import { setCurrentItemValue } from "@/store/features/lesson_application";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, FormControl, FormHelperText, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';

interface QuestionProps {
  handleTab: (value: string) => void;
}

const Question: React.FC<QuestionProps> = ({ handleTab }) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector((state) => state.lesson_application.item);

  return (
    <Box 
      sx={{ padding: 3, backgroundColor: '#f4f6f8', borderRadius: 2, boxShadow: 2}}
    >
      {/* Lesson Start Date */}
      <FormControl fullWidth sx={{ marginBottom: 4, maxWidth:500 }} error={Boolean(result.errors.startDate)} >
        <FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333', marginBottom: 2 }}>
          レッスン受講はいつから開始できますか？
        </FormLabel>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2, lineHeight: 1.5 }}>
          月の途中からスタートされた場合、初月はレッスン実施分のみのお支払いとなります。
        </Typography>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            value={result.form.startDate ? moment(result.form.startDate, 'YYYY-MM-DD') : null}
            onChange={(newDate: Moment|null)=>dispatch(setCurrentItemValue({startDate: newDate?newDate.format('YYYY-MM-DD') : null }))}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                error: Boolean(result.errors.startDate),
                helperText: result.errors.startDate ? '必須です。' : '',
                sx: {
                  '& .MuiInputBase-root': {
                    '&:before, &:after': {
                      borderBottom: 'none', // Ensure no default bottom border
                    },
                    '&.MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none', // Remove the outer border
                      },
                    },
                    border: 'none', // Ensure no border except bottom
                    borderBottom: 'none',  // Bottom border
                    '&:hover': {
                      border: 'none',  // Hover state
                    },
                    '&.Mui-focused': {
                      borderBottom: 'none',  // Focus state
                    },
                    '&.Mui-error': {
                      borderBottom: '2px solid red',  // Error state
                    },
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      {/* Reason for Enrollment */}
      <FormControl fullWidth sx={{ marginBottom: 4 }} error={Boolean(result.errors.reason)} >
        <FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333', marginBottom: 2 }}>
          最後に、ロアンのベトナム語講座の受講を決めた1番の理由を教えてください
        </FormLabel>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2, lineHeight: 1.5 }}>
          講座の内容や担当講師に関するコメントだと今後の励みになります！
        </Typography>
        <TextField
          variant="standard"
          placeholder="Your answer"
          name='reason'
          value={result.form.reason}
          onChange={e => dispatch(setCurrentItemValue({ reason: e.target.value }))}
          fullWidth
          sx={{
            '& .MuiInputBase-root': {
              '& input': {
                borderBottom: '2px solid rgba(0, 0, 0, 0.42)', 
                transition: 'border-color 0.3s',
                '&:focus': {
                  borderBottom: '2px solid #1976d2',
                },
                '&:hover': {
                  borderBottom: '2px solid rgba(0, 0, 0, 0.87)',
                },
              },
            },
          }}
          InputProps={{
            style: { borderRadius: 0 },
            disableUnderline: true,
          }}
          error={Boolean(result.errors.reason)}
          helperText={result.errors.reason ? '必須です。' : ''}
        />
      </FormControl>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => handleTab('4')} 
          sx={{ borderRadius: '20px', width: '45%', color: '#1976d2', borderColor: '#1976d2', '&:hover': { borderColor: '#1565c0' } }}
        >
          戻る
        </Button>
        <Button 
          variant="contained" 
          endIcon={<ArrowForwardIcon />} 
          onClick={() => handleTab('7')} 
          sx={{ borderRadius: '20px', width: '45%', backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0' }}}
        >
          続行
        </Button>
      </Box>
    </Box>
  );
};

export default Question;