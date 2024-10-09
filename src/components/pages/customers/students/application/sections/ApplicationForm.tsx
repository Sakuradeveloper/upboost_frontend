import React, { useRef, useState, useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Checkbox,
  Typography,
  ThemeProvider,
  createTheme,
  FormHelperText
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Moment } from 'moment';
import { useAppDispatch } from '@/store/hooks';
import { postRequest, publicApiInstance } from '@/utils/axios';
import { appendMessage } from '@/store/features/utils';
import { useAuth } from '@/contexts/AuthContext';

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          "&.Mui-focused": {
            color: '#298904',
          },
          "&.Mui-error": {
            color: 'red',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: '#298904',
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: 'red',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          "&.Mui-error": {
            color: 'red',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: '#298904',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: '#298904',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          color: 'inherit',
          '&.Mui-error': {
            color: 'red',
          },
          '&.Mui-focused': {
            color: '#298904',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '16px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '& input': {
            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
            transition: 'border-color 0.3s',
            '&:focus': {
              borderBottom: '2px solid #298904',
              outline: 'none',
            },
            '&.Mui-error': {
              borderBottom: '2px solid red',
            },
          },
        },
      },
    },
  },
});

const initialFormState = {
  name: '',
  plan: '',
  otherPlan: '',
  recording: '',
  startDate: null as Moment | null,
  date:'',
  book: '',
  payment: '',
  vocabulary: '',
  reason: '',
  condition: '',
};

const ApplicationForm: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | { name?: string; value?: unknown }>) => {
      const { name, value } = e.target;
  
      setFormData((prev:any) => {
        // Check if the change is in the "plan" or "otherPlan" field
        if (name === 'plan') {
          return {
            ...prev,
            [name]: value,
            otherPlan: value === 'other' ? prev.otherPlan : '', // Reset otherPlan if plan is not "other"
          };
        } else if (name === 'otherPlan') {
          return {
            ...prev,
            [name]: value,
          };
        }
        return { ...prev, [name!]: value };
      });
  
      setErrors((prev) => {
        if (name === 'plan') {
          return {
            ...prev,
            [name]: !value,
            otherPlan: value === 'other' ? !formData.otherPlan : false, // Conditionally set error
          };
        } else if (name === 'otherPlan') {
          return {
            ...prev,
            [name]: formData.plan === 'other' && !value,
          };
        }
        return { ...prev, [name!]: !value };
      });
    },
    [formData.otherPlan, formData.plan]
  );

  const handleDateChange = useCallback((date: Moment | null) => {
    const formattedDate = date ? date.format('YYYY-MM-DD') : '';
    setFormData((prev) => ({ ...prev, startDate: date, date: formattedDate }));
    setErrors((prev) => ({ ...prev, date: !formattedDate }));
  }, []);

  const validateForm = () => {
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = !formData[key as keyof typeof formData];
      return acc;
    }, {} as Record<string, boolean>);

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {

    console.log(formData, "======>>>>>>>>>>> form Data")
    console.log(errors, "<<<<<<<<<<<<<<<<< error")
    e.preventDefault();
    if (!validateForm()) {
      dispatch(appendMessage({ type: 'error', message: '申込書の全項目をご記入の上、再度お申込みください。' }));
      return;
    }

    try {
      const response = await postRequest(`/v0/lecture/${user?.id}`, formData);
      if (response.status === 200) {
      } else {
        dispatch(appendMessage({ type: 'error', message: '申請中に問題が発生しました。 再度申請してください。' }));
        console.error('Error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: '#f0f4ec',
          padding: 12,
          borderRadius: 2,
          boxShadow: 1,
          maxWidth: 800,
          margin: 'auto',
        }}
      >
        <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
          <Typography component="legend" sx={{ fontWeight: 'bold' }}>
            規約についての確認
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
            以下の規約を確認後、「同意する」を選択してください。
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2, whiteSpace: 'pre-line' }}>
            レッスン日の変更・キャンセル<br />
            ・レッスンを変更またはキャンセルされる場合は、レッスン日の前日までにLINEにてお知らせください。<br />
            ・レッスン開始15分後までに連絡がなければ、無断欠勤としてレッスンが消化されます。<br />
            ・開始1時間以内の日程変更は無断不可、1レッスン消化します。<br />
            ・緊急時にもレッスン時間の変更を避けるようにお願いいたします。<br />
            レッスンの振替<br />
            ・振替レッスンは翌月までの利用が必須になります。<br />
            ・1度に3レッスン以上の振替はご遠慮ください。講師のスケジュールの都合上、全ての振替レッスンを希望通りに実施できない場合がございます。<br />
            ・振替ができない場合、レッスンは実施されたものとみなしますので、予めご了承ください。<br />
            レッスン数や1レッスンあたりの時間の変更<br />
            ・レッスン数変更も前月14日までにお願いします。<br />
            休会・退会<br />
            ・休会・退会は前月14日までに連絡してください。遅れると翌々月処理になります。<br />
          </Typography>
          <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
            規約について *
          </FormLabel>
          <RadioGroup value={formData.condition} name="condition" onChange={handleInputChange}>
            <FormControlLabel value="agree" control={<Radio />} label="同意する" />
          </RadioGroup>
        </FormControl>

        {/* Name Input */}
        <FormControl fullWidth sx={{ marginBottom: 3 }} error={Boolean(errors.name)}>
          <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
            ① 氏名 *
          </FormLabel>
          <TextField
            variant="standard"
            placeholder="Your answer"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={{
              marginLeft: 1,
              marginTop: 1,
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
            helperText={errors.name ? '氏名は必須です。' : ''}
            error={Boolean(errors.name)}
          />
        </FormControl>

        {/* Plan Selection */}
        <FormControl component="fieldset" error={errors.plan} sx={{ fontWeight: 'bold', marginBottom: 3 }} required>
          <FormLabel component="legend" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            ② どのプランを希望しますか？ [各レッスンは60分間となっております]
          </FormLabel>
          <RadioGroup value={formData.plan} name="plan" onChange={handleInputChange}>
            <FormControlLabel value="plan1" control={<Radio />} label="月2回 6,600円(税込) | 月額" />
            <FormControlLabel value="plan2" control={<Radio />} label="週1回 | 月4回 12,800円(税込) | 月額" />
            <FormControlLabel value="plan3" control={<Radio />} label="週2回 | 月8回 25,200円(税込) | 月額" />
            <FormControlLabel value="plan4" control={<Radio />} label="週3回 | 月12回 37,200円(税込) | 月額" />
            <FormControlLabel value="plan5" control={<Radio />} label="週4回 | 月16回 48,800円(税込) | 月額" />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label={
                <TextField
                  placeholder="Other"
                  value={formData.otherPlan}
                  name="otherPlan"
                  onChange={handleInputChange}
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
                  disabled={formData.plan !== 'other'}
                  error={formData.plan === 'other' && errors.otherPlan}
                />
              }
            />
          </RadioGroup>
          {errors.otherPlan && (
            <FormHelperText error>
              必須です。
            </FormHelperText>
          )}
        </FormControl>

       {/* Lesson Recording Sharing */}
       <FormControl component="fieldset" sx={{ marginBottom: 3 }} error={Boolean(errors.recording)}>
          <FormLabel component="legend" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            ③ レッスン録画共有を希望しますか？
          </FormLabel>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
            ・講師が毎回のレッスンを録画し、終了後にDropboxを通じて受講者に共有するサービスです。<br />
            ・このサービスを利用することで、復習が容易になり、レッスン中は会話に集中することができます。
          </Typography>
          <RadioGroup defaultValue="no" name="recording" value={formData.recording} onChange={handleInputChange}>
            <FormControlLabel value="yes" control={<Radio />} label="はい (1レッスンあたり +275円/月額)" />
            <FormControlLabel value="no" control={<Radio />} label="いいえ" />
          </RadioGroup>
          {errors.recording && (
            <FormHelperText error>
              必須です。
            </FormHelperText>
          )}
        </FormControl>

        {/* Additional Materials Purchase */}
        <FormControl component="fieldset" sx={{ marginBottom: 3 }} error={Boolean(errors.book)} >
          <FormLabel component="legend" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            ④ 参考書の形式について、データ版を購入する
          </FormLabel>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
            究極のベトナム語攻略ブック 初級編は合計3冊ございます。
          </Typography>
          <RadioGroup name="book" value={formData.book} onChange={handleInputChange}>
            <FormControlLabel value='yes' control={<Radio />} label="究極のベトナム語攻略ブック 初級編(1-20頁) (1,400円) [PDF]" />
          </RadioGroup>
          {errors.book && (
            <FormHelperText error>
              必須です。
            </FormHelperText>
          )}
        </FormControl>

        {/* Pay count */}
        <FormControl component="fieldset" sx={{ marginBottom: 3 }} error={Boolean(errors.payment)} >
          <FormLabel component="legend" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            ⑤ お支払回数は、どちらを希望しますか？ *
          </FormLabel>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          ・一括で複数月分をお支払いの場合、返金はいたしかねます。<br />
          ・月2回プランは割引対象外です。<br />
          ・月の途中でレッスンが開始された場合、実施されたレッスン数に基づいて合計割引が算出されます。<br />
          ・休会や退会、お支払変更のご連絡がない場合、お支払いは初回と同じ頻度で更新月に自動的に行われます。<br />
          </Typography>
          <RadioGroup value={formData.payment} onChange={handleInputChange} name="payment">
            <FormControlLabel value="1" control={<Radio />} label="月払い" />
            <FormControlLabel value="3" control={<Radio />} label="3ヶ月一括払い[※毎月300円割引、合計900円割引]" />
            <FormControlLabel value="6" control={<Radio />} label="6ヶ月一括払い[※毎月500円割引、合計3,000円割引]" />
            <FormControlLabel value="12" control={<Radio />} label="12ヶ月一括払い[※毎月750円割引、合計9,000円割引]" />
          </RadioGroup>
          {errors.payment && (
            <FormHelperText error>
              必須です。
            </FormHelperText>
          )}
        </FormControl>

        {/* vocabulary */}
        <FormControl component="fieldset" sx={{ marginBottom: 3 }} error={Boolean(errors.vocabulary)} >
          <FormLabel component="legend" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
           ⑥ 単語帳は購入されますか？ *
          </FormLabel>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          ・『究極のベトナム語単語ブック』は、ベトナム語学習者が抱える悩みを解消するために開発された、充実した内容の単語帳です。本単語帳は、3600以上の単語と1600以上の例文を収録しており、日常会話からビジネスシーンまで対応する幅広いフレーズが特徴です。<br />
          ・単語帳はデータでのお渡しになります。<br />
          ・ロアンのベトナム語講座の申し込み時に限り、3,300円ではなく「2,800円（税込）」で購入できます。<br />
          ・詳細はこちらから確認できます。<br />
          </Typography>
          <RadioGroup value={formData.vocabulary} name="vocabulary" onChange={handleInputChange}>
            <FormControlLabel value="yes" control={<Radio />} label="はい (1レッスンあたり +275円/月額)" />
            <FormControlLabel value="no" control={<Radio />} label="いいえ" />
          </RadioGroup>
          {errors.vocabulary && (
            <FormHelperText error>
              必須です。
            </FormHelperText>
          )}
        </FormControl>

        {/* Lesson Start Date */}
        <FormControl fullWidth sx={{ marginBottom: 3 }} error={Boolean(errors.startDate)} >
          <FormLabel component="legend" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            ⑦ レッスン受講はいつから開始できますか？
          </FormLabel>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
            月の途中からスタートされた場合、初月はレッスン実施分のみのお支払いとなります。
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              value={formData.startDate}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  error: Boolean(errors.startDate),
                  helperText: errors.startDate ? '必須です。' : '',
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
                  InputProps: {
                    disableUnderline: true,  // Remove default underline
                  },
                },
              }}
            />
          </LocalizationProvider>
          {errors.date && (
            <FormHelperText error>
              必須です。
            </FormHelperText>
          )}
        </FormControl>

        {/* Reason for Enrollment */}
        <FormControl fullWidth sx={{ marginBottom: 3 }} error={Boolean(errors.reason)} >
          <FormLabel component="legend" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            ⑧ 最後に、ロアンのベトナム語講座の受講を決めた1番の理由を教えてください
          </FormLabel>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
            講座の内容や担当講師に関するコメントだと今後の励みになります！
          </Typography>
          <TextField
            variant="standard"
            placeholder="Your answer"
            name='reason'
            value={formData.reason}
            onChange={handleInputChange}
            sx={{
              marginLeft: 1,
              marginTop: 1,
              '& .MuiInputBase-root': {
                '& input': {
                  border: 'none',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.42)',  // Default bottom border
                  transition: 'border-color 0.3s',
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottom: '2px solid rgba(0, 0, 0, 0.87)',  // Controlled hover state color
                  },
                  '&:focus': {
                    borderBottom: '2px solid #298904',  // Focused bottom border color
                    outline: 'none',  // Remove any outline on focus
                  },
                },
              },
              '&:hover .MuiOutlinedInput-root .MuiInputBase-input': {
                borderBottom: '2px solid rgba(0, 0, 0, 0.87)',  // Correct hover color
              },
            }}
            InputProps={{
              style: { borderRadius: 0 },
              disableUnderline: true,  // Remove default underline
            }}
            error={errors.reason}
            helperText={errors.reason ? '必須です。' : ''}
          />
        </FormControl>

        {/* Confirmation Message */}
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2, marginBottom:4 }}>
          ご記入ありがとうございました！<br />
          受講申込みフォームを確認後、日程等を調整し、今後の詳細をLINEでお伝えします。
        </Typography>

        {/* Submit Button */}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            backgroundColor: '#298904',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1e6c02',
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default ApplicationForm;