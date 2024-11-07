import React, { useRef, useState } from 'react';
import { Box, TextField, Button, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel, MenuItem, Select, Checkbox, Typography, Grid, InputLabel, SelectChangeEvent, FormHelperText, ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Moment } from 'moment';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { publicApiInstance } from '@/utils/axios';
import { appendMessage } from '@/store/features/utils';

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px', // Font size for labels
          "&.Mui-focused": {
            color: '#F29C2E', // Focus color for label
          },
          "&.Mui-error": {
            color: 'red', // Error color for label
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: '#F29C2E', // Hover color for the border
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: '#F29C2E', // Focus color for the border
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: 'red', // Error color for the border
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '14px', // Font size for input text
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: '#F29C2E', // Hover color for the border
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: '#F29C2E', // Focus color for the border
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: 'red', // Error color for the border
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '12px', // Font size for helper text
          "&.Mui-error": {
            color: 'red', // Error color for helper text
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: '#F29C2E', // Checked color (when focused or selected)
          },
          "&.Mui-error": {
            color: 'red', // Error color
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: '#F29C2E', // Checked color (when focused or selected)
          },
          "&.Mui-error": {
            color: 'red', // Error color
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px', // Font size for labels
          color: 'inherit',
          '&.Mui-error': {
            color: 'red', // Error state color
          },
          '&.Mui-focused': {
            color: '#F29C2E', // Focus state color
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '14px', // Font size for FormControlLabel label
        },
      },
    },
  },
});

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    nameKana: '',
    email: '',
    confirmEmail: '',
    phone: '',
    ageGroup: '',
    firstChoiceDate: null,
    firstChoiceDateString: '',
    firstChoiceTime: '',
    secondChoiceDate: null,
    secondChoiceDateString: '',
    secondChoiceTime: '',
    region: '',
    characterCount: 0,
    plan: [] as string[],
    resultPlan:'',
    vietnameseDialect: '',
    purposes: [] as string[],
    resultPurposes:'',
    otherPurpose: '',
    availability: '',
    preferredPlan: '',
    experience:'',
    otherInfo: '',
    medium:'',
    otherMedium:'',
    errors: {
        name: false,
        nameKana: false,
        email: false,
        confirmEmail: false,
        phone: false,
      }
  });

  const [errors, setErrors] = useState({
    name:false,
    nameKana: false,
    email: false,
    confirmEmail: false,
    phone: false,
    ageGroup: false,
    region: false,
    plan:false,
    firstChoiceDate: false,
    firstChoiceTime: false,
    secondChoiceDate: false,
    secondChoiceTime: false,
    vietnameseDialect:false,
    purposes:false,
    availability:false,
    preferredPlan:false,
    experience:false,
    medium:false
  });

  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value?: unknown }>) => {

    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name!]: value,
      }));
    
    setErrors(prevState => ({
      ...prevState,
      [name!]: value === '',
    }))

    if (name === 'phone') {
      setFormData(prevState => ({
        ...prevState,
        characterCount: (value as string).length
      }));
    }
  };

  const handleDateChange = (name: string) => (date: Moment | null) => {
    const formattedDate = date ? date.format('YYYY-MM-DD') : '';
    setFormData(prevState => ({
      ...prevState,
      [name]: date,
      [`${name}String`]: formattedDate
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setFormData(prevState => {
      const newPurposes = prevState.purposes.includes(value)
        ? prevState.purposes.filter(purpose => purpose !== value)
        : [...prevState.purposes, value];
      return { ...prevState, purposes: newPurposes, otherPurpose:prevState.purposes.includes(name)?prevState.otherPurpose:'' };
    });
    setErrors(prevState => ({
      ...prevState,
      [name!]: value === '',
    }))
  };

  const handleRadioChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      otherMedium: (value === 'other') ? '' : prevState.otherMedium, // Reset otherPurpose if 'other' is unchecked
    }
    ));
  }

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      otherPurpose: event.target.value,
    });
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prevState => {
      const newPlan = prevState.plan.includes(value)
        ? prevState.plan.filter(purpose => purpose !== value)
        : [...prevState.plan, value];
      return { ...prevState, plan: newPlan };
    });
    console.log(value.toString(), "pppppppppppppppppppppppp")
    setErrors(prevState => ({
      ...prevState,
      'plan' : value.toString() === '',
    }))
  };

  const handleSubmit =async  (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: !formData.name,
      nameKana: !formData.nameKana,
      email: !formData.email,
      confirmEmail: !formData.confirmEmail,
      phone: !formData.phone,
      ageGroup: !formData.ageGroup,
      region: !formData.region,
      plan: !formData.plan.toString(),
      firstChoiceDate: !formData.firstChoiceDate,
      firstChoiceTime: !formData.firstChoiceTime,
      secondChoiceDate: !formData.secondChoiceDate,
      secondChoiceTime: !formData.secondChoiceTime,
      vietnameseDialect: !formData.vietnameseDialect,
      purposes: !formData.purposes.toString(),
      availability: !formData.availability,
      preferredPlan: !formData.preferredPlan,
      experience: !formData.experience,
      medium: !formData.medium,
    };
    setErrors(newErrors);
    const isValid = !Object.values(newErrors).some((error) => error);
    if (isValid) {
      // form is valid, submit the data
      console.log(formData);
    } else {
      // form is invalid, show error messages
      dispatch(appendMessage({ type: 'error', message: '申込書の全項目をご記入の上、再度お申込みください。' }));
      return;
    }

    const trialForm = {
      ...formData, 
      resultPlan:formData.plan.toString(), 
      resultPurposes:formData.purposes.toString()
    }
    if(trialForm.email !== trialForm.confirmEmail) {
        dispatch(appendMessage({ type: 'error', message: 'メールをもう一度確認してください。' }));
        if (emailRef.current) {
          emailRef.current.focus();
        }
      return;
    }
    try {
      const response = await publicApiInstance.post('/application', trialForm, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
      if (response.status === 200) {
          dispatch(appendMessage({ type: 'success', message: '申請されました。' }));
      } else {
        dispatch(appendMessage({ type: 'error', message: '申請中に問題が発生しました。 再度申請してください。' }));
          console.error('Error:', response.data);
      }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ThemeProvider theme={theme}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', position:'relative', flexDirection: 'column', gap: {xs:4, md:2, lg:3}, width: { xs: '100%', sm: '600px', md:'700px', lg:'1000px'}, margin: '0 auto', paddingY: {xs:8, sm:8, md:8}, paddingX:{xs:2, sm:8, md:12, lg:24}, backgroundColor: 'white', borderRadius:4,  boxShadow: 'lg'}}>
        <Typography sx={{fontSize:12 }}>
          ※フォーム送信後、24時間以内に体験レッスン日確定のご案内をLINEまたはメールにてお送りいたします<br />
          ※無料体験レッスンは30分のZoomを使ったオンラインレッスンです。<br />
          ※時間の記載は「日本時間」でお願いいたします。<br />
        </Typography>
        <TextField
          label="名前 *"
          name="name"
          placeholder='山田 太郎'
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          helperText={errors.name ? "このフィールドは必須です" : ""} />
        <TextField
          label="名前（ひらがな）*"
          name="nameKana"
          placeholder='やまだ たろう'
          value={formData.nameKana}
          onChange={handleChange}
          error={errors.nameKana}
          helperText={errors.nameKana ? "全角カタカナで入力してください" : ""}
        />
        <TextField
          label="メールアドレス *"
          type="email"
          name="email"
          placeholder='mail@example.com'
          value={formData.email}
          onChange={handleChange}
          inputRef={emailRef}
          error={errors.email}
          helperText={errors.email ? "有効なメールアドレスを入力してください。" : ""}
        />
        <TextField
          label="メール確認 *"
          type="email"
          name="confirmEmail"
          placeholder='mail@example.com'
          value={formData.confirmEmail}
          onChange={handleChange}
          error={errors.confirmEmail}
          helperText={errors.confirmEmail ? "入力したメールが一致しません。" : ""}
        />
        <TextField
          label="電話番号 *"
          name="phone"
          placeholder='09012345678'
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          helperText={errors.phone ? "このフィールドは必須です" : `Number of characters 20 or less, Current number of characters ${formData.characterCount}`}
          inputProps={{ maxLength: 20 }}
        />
        
        <FormControl required component="fieldset" error={errors.ageGroup} >
          <FormLabel component="legend">あなたの年代 </FormLabel>
          <RadioGroup name="ageGroup" value={formData.ageGroup} onChange={handleChange} row sx={{display: 'grid', gridTemplateColumns: {xs:'repeat(2, 1fr)', sm:'repeat(3, 1fr)'}, }}>
            <FormControlLabel value="18" control={<Radio />} label="18歳未満" />
            <FormControlLabel value="20" control={<Radio />} label="20代" />
            <FormControlLabel value="30" control={<Radio />} label="30代" />
            <FormControlLabel value="40" control={<Radio />} label="40代" />
            <FormControlLabel value="50" control={<Radio />} label="50代" />
            <FormControlLabel value="60" control={<Radio />} label="60代以上" />
          </RadioGroup>
          {errors.ageGroup && <FormHelperText>このフィールドは必須です</FormHelperText>}
        </FormControl>
        <FormControl error={errors.region}>
          {/* <FormLabel>居住地</FormLabel> */}
          <InputLabel id="region">居住地 *</InputLabel>
          <Select labelId="region" name="region" label='居住地' value={formData.region} onChange={handleSelectChange} >
            <MenuItem value="北海道">北海道</MenuItem>
            <MenuItem value="青森県">青森県</MenuItem>
            <MenuItem value="岩手県">岩手県</MenuItem>
            <MenuItem value="宮城県">宮城県</MenuItem>
            <MenuItem value="秋田県">秋田県</MenuItem>
            <MenuItem value="山形県">山形県</MenuItem>
            <MenuItem value="福島県">福島県</MenuItem>
            <MenuItem value="茨城県">茨城県</MenuItem>
            <MenuItem value="栃木県">栃木県</MenuItem>
            <MenuItem value="群馬県">群馬県</MenuItem>
            <MenuItem value="埼玉県">埼玉県</MenuItem>
            <MenuItem value="千葉県">千葉県</MenuItem>
            <MenuItem value="東京都">東京都</MenuItem>
            <MenuItem value="神奈川県">神奈川県</MenuItem>
            <MenuItem value="新潟県">新潟県</MenuItem>
            <MenuItem value="富山県">富山県</MenuItem>
            <MenuItem value="石川県">石川県</MenuItem>
            <MenuItem value="福井県">福井県</MenuItem>
            <MenuItem value="山梨県">山梨県</MenuItem>
            <MenuItem value="長野県">長野県</MenuItem>
            <MenuItem value="岐阜県">岐阜県</MenuItem>
            <MenuItem value="静岡県">静岡県</MenuItem>
            <MenuItem value="愛知県">愛知県</MenuItem>
            <MenuItem value="三重県">三重県</MenuItem>
            <MenuItem value="滋賀県">滋賀県</MenuItem>
            <MenuItem value="京都府">京都府</MenuItem>
            <MenuItem value="大阪府">大阪府</MenuItem>
            <MenuItem value="兵庫県">兵庫県</MenuItem>
            <MenuItem value="奈良県">奈良県</MenuItem>
            <MenuItem value="和歌山県">和歌山県</MenuItem>
            <MenuItem value="鳥取県">鳥取県</MenuItem>
            <MenuItem value="島根県">島根県</MenuItem>
            <MenuItem value="岡山県">岡山県</MenuItem>
            <MenuItem value="広島県">広島県</MenuItem>
            <MenuItem value="山口県">山口県</MenuItem>
            <MenuItem value="徳島県">徳島県</MenuItem>
            <MenuItem value="香川県">香川県</MenuItem>
            <MenuItem value="愛媛県">愛媛県</MenuItem>
            <MenuItem value="高知県">高知県</MenuItem>
            <MenuItem value="福岡県">福岡県</MenuItem>
            <MenuItem value="佐賀県">佐賀県</MenuItem>
            <MenuItem value="長崎県">長崎県</MenuItem>
            <MenuItem value="熊本県">熊本県</MenuItem>
            <MenuItem value="大分県">大分県</MenuItem>
            <MenuItem value="宮崎県">宮崎県</MenuItem>
            <MenuItem value="鹿児島県">鹿児島県</MenuItem>
            <MenuItem value="沖縄県">沖縄県</MenuItem>
            <MenuItem value="日本国外">日本国外</MenuItem>
          </Select>
          {errors.region && <FormHelperText>このフィールドは必須です</FormHelperText>}
        </FormControl>

        <FormControl required component="fieldset" error={errors.plan}>
          <FormLabel component="legend" sx={{mb:1}}>希望するプラン </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                value="beginner"
                name="plan"
                checked={formData.plan.includes("beginner")}
                onChange={handlePlanChange}
              />
            }
            label="【オンライン】初心者向け（テキスト＋会話）"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="professional"
                name='plan'
                checked={formData.plan.includes("professional")}
                onChange={handlePlanChange}
              />
            }
            label="【オンライン】中・上級者向け（新聞やニュースサイト＋会話）"
          />
          {errors.plan && <FormHelperText>このフィールドは必須です</FormHelperText>}
        </FormControl>

        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth error={errors.firstChoiceDate}>
              <LocalizationProvider dateAdapter={AdapterMoment} >
                {/* <DemoContainer components={['DatePicker']}> */}
                  {/* <DatePicker name='firstChoiceDate' label="無料体験レッスン希望日【第1希望】*" value={formData.firstChoiceDate} onChange={date=>handleDateChange('firstChoiceDate')(date)}/> */}
                {/* </DemoContainer> */}
              </LocalizationProvider>
              {errors.firstChoiceDate && <FormHelperText>このフィールドは必須です</FormHelperText>}
          </FormControl>
        </Grid>

        {/* First Desired Time Slot */}
        <FormControl required component="fieldset" error={errors.firstChoiceTime}>
          <FormLabel component="legend">時間帯【第1希望】</FormLabel>
          <RadioGroup name="firstChoiceTime" value={formData.firstChoiceTime} onChange={handleChange} row sx={{display: 'grid', 
            gridTemplateColumns: { sx: 'repeat(1, 1fr)', sm:'repeat(2, 1fr)'},}}>
            <FormControlLabel value="morning" control={<Radio />} label="午前中" />
            <FormControlLabel value="noon" control={<Radio />} label='12:00 〜 15:00' />
            <FormControlLabel value="afternoon" control={<Radio />} label="15:00 〜 19:00" />
            <FormControlLabel value="evening" control={<Radio />} label="19:00 以降" />
          </RadioGroup>
          {errors.firstChoiceTime && <FormHelperText>このフィールドは必須です</FormHelperText>}
        </FormControl>

        {/* Second Desired Date */}
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth error={errors.secondChoiceDate}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                {/* <DemoContainer components={['DatePicker']}> */}
                  {/* <DatePicker label="無料体験レッスン希望日【第2希望】" value={formData.secondChoiceDate} onChange={date=>handleDateChange('secondChoiceDate')(date)}/> */}
                {/* </DemoContainer> */}
              </LocalizationProvider>
              {errors.secondChoiceDate && <FormHelperText>このフィールドは必須です</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Second Desired Time Slot */}
        <FormControl required component="fieldset" error={errors.secondChoiceTime}>
          <FormLabel component="legend">時間帯【第2希望】</FormLabel>
          <RadioGroup name="secondChoiceTime" value={formData.secondChoiceTime} onChange={handleChange} row sx={{display: 'grid', 
            gridTemplateColumns: { sx: 'repeat(1, 1fr)', sm:'repeat(2, 1fr)'}, 
             }}>
            <FormControlLabel value="morning" control={<Radio />} label="午前中" />
            <FormControlLabel value="noon" control={<Radio />} label="12:00 〜 15:00" />
            <FormControlLabel value="afternoon" control={<Radio />} label="15:00 〜 19:00" />
            <FormControlLabel value="evening" control={<Radio />} label="19:00 以降" />
          </RadioGroup>
          {errors.secondChoiceTime && <FormHelperText>このフィールドは必須です</FormHelperText>}
        </FormControl>

        {/* Vietnamese Dialect */}
        <FormControl required component="fieldset" error={errors.vietnameseDialect}>
          <FormLabel component="legend">どのベトナム語をメインに学習したいですか？</FormLabel>
          <RadioGroup name="vietnameseDialect" value={formData.vietnameseDialect} onChange={handleChange} row sx={{display: 'grid', 
            gridTemplateColumns: { sx: 'repeat(1, 1fr)', sm:'repeat(2, 1fr)'}, 
             }}>
            <FormControlLabel value="標準語(北部弁)" control={<Radio />} label="標準語(北部弁)" />
            <FormControlLabel value="南部弁" control={<Radio />} label="南部弁" />
            <FormControlLabel value="中部弁" control={<Radio />} label="中部弁" />
            <FormControlLabel value="特にこだわりはない" control={<Radio />} label="特にこだわりはない" />
          </RadioGroup>
          {errors.vietnameseDialect && <FormHelperText>このフィールドは必須です</FormHelperText>}
        </FormControl>

        {/* Study Purpose */}
        <FormControl required component="fieldset" error={errors.purposes}>
          <FormLabel component="legend">ベトナム語を勉強する目的【複数選択可】</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                name='partner'
                value="partner"
                checked={formData.purposes.includes("partner")}
                onChange={handleCheckboxChange}
              />
            }
            label="ベトナム人のパートナーや家族と話せるようになりたい"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="work"
                value="work"
                checked={formData.purposes.includes("work")}
                onChange={handleCheckboxChange}
              />
            }
            label="仕事や業務でのコミュニケーションに役立てたい"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="travel"
                value="travel"
                checked={formData.purposes.includes("travel")}
                onChange={handleCheckboxChange}
              />
            }
            label="ベトナムへの旅行や移住を検討している"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="other"
                value="other"
                checked={formData.purposes.includes("other")}
                onChange={handleCheckboxChange}
              />
            }
            label="Other"
          />
          {formData.purposes.includes("other") && (
              <TextField
                name="otherPurpose"
                placeholder="Type your answer"
                label='Other'
                value={formData.otherPurpose}
                onChange={handleOtherChange}
                sx={{ mt: 2 }}
              />
            )}
          {errors.purposes && <FormHelperText>このフィールドは必須です</FormHelperText>}
        </FormControl>

        {/* Availability */}
        <TextField
          label="継続受講された場合の受講可能な日程"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          placeholder="例）平日19-22時, 土日9-12時"
          error={errors.availability}
          helperText={errors.availability ? "このフィールドは必須です" : ""}
        />

        {/* Preferred Plan */}
        <FormControl required component="fieldset" error={errors.preferredPlan}>
          <FormLabel component="legend">継続受講された場合の希望プラン</FormLabel>
          <RadioGroup name="preferredPlan" value={formData.preferredPlan} onChange={handleChange} row sx={{ 
            display: 'grid', 
            gridTemplateColumns: { sx: 'repeat(1, 1fr)', sm:'repeat(2, 1fr)'}, 
            gap: 1 
          }}  >
            <FormControlLabel value="one" control={<Radio />} label="週1回プラン(月4回)" />
            <FormControlLabel value="two" control={<Radio />} label="週2回プラン(月8回)" />
            <FormControlLabel value="three" control={<Radio />} label="週3回プラン(月12回)" />
            <FormControlLabel value="four" control={<Radio />} label="週4回以上(月16回以上)" />
            <FormControlLabel value="month" control={<Radio />} label="月2回プラン" />
          </RadioGroup>
          {errors.preferredPlan && <FormHelperText>このフィールドは必須です</FormHelperText>}
        </FormControl>

        {/* Vietnamese Learning History */}
        <FormControl error={errors.experience}>
          <InputLabel id="experience">ベトナム語学習歴</InputLabel>
          <Select name="experience" label='ベトナム語学習歴' labelId='experience' value={formData.experience} onChange={handleSelectChange}>
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value="novice">全く初めて</MenuItem>
            <MenuItem value="beginner">簡単なベトナム語なら話せる</MenuItem>
            <MenuItem value="competent">日常会話レベルなら話せる</MenuItem>
            <MenuItem value="proficient">仕事でベトナム語を使っている</MenuItem>
          </Select>
          {errors.experience && <FormHelperText>このフィールドは必須です</FormHelperText>}
        </FormControl>
        <FormControl required component="fieldset" error={errors.medium}>
          <FormLabel component="legend">本講座を最初に知った媒体はどれですか？</FormLabel>
          <RadioGroup name="medium" value={formData.medium} onChange={handleRadioChange}>
            <FormControlLabel value="serach" control={<Radio />} label="検索サイト（Yahoo!やGoogleなど）" />
            <FormControlLabel value="youtube" control={<Radio />} label="YouTube「カケル＆ロアン」" />
            <FormControlLabel value="sns" control={<Radio />} label="SNS(Facebook・Instagram)" />
            <FormControlLabel value="poster" control={<Radio />} label="名刺・ポスター" />
            <FormControlLabel value="acquaintance" control={<Radio />} label="知人紹介" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          {(formData.medium === 'other')&& (
              <TextField
                name="otherMedium"
                placeholder="Type your answer"
                label='Other'
                value={formData.otherMedium}
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
            )}
          {errors.medium && <FormHelperText>このフィールドは必須です</FormHelperText>}
        </FormControl>

        {/* Other Info */}
        <TextField
          label="その他"
          name="otherInfo"
          value={formData.otherInfo}
          onChange={handleChange}
          multiline
          rows={4}
          placeholder="Any other information you'd like to provide"
        />

        <Button type="submit" variant="contained" color="primary" sx={{ padding:1, fontSize:"1.25rem", backgroundColor:'#F29C2E', '&:hover':{ backgroundColor:'#D87A1E' } }}>Submit</Button>
        <div className='absolute top-[-2rem] right-12'>
          <img src="/images/students/trial/img-form.png" alt="birds" />
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default Form;