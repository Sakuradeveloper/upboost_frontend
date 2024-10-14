import { setCurrentItem, setCurrentItemValue } from "@/store/features/lesson_application";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface TermConditionProps {
	handleTab:(value:string)=>void;
}

const TermCondition: React.FC<TermConditionProps> = ({handleTab}) =>{
	const dispatch = useAppDispatch();
	const result = useAppSelector((state)=>state.lesson_application.item)
	return (
		<Box sx={{ padding: 3, backgroundColor: '#f4f6f8', borderRadius: 2, boxShadow: 1 }}>
      <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
        <Typography component="legend" sx={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#333' }}>
          規約についての確認
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          以下の規約を確認後、「同意する」を選択してください。
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2, whiteSpace: 'pre-line', lineHeight: 1.6 }}>
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
        <FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#555' }}>
          規約について *
        </FormLabel>
        <RadioGroup value={result.form.condition} name="condition" onChange={e => dispatch(setCurrentItemValue({ condition: e.target.value }))}>
          <FormControlLabel value="agree" control={<Radio />} label="同意する" />
        </RadioGroup>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => handleTab('1')} 
          sx={{ borderRadius: '20px', width: '45%', color: '#1976d2', borderColor: '#1976d2' }}
        >
          戻る
        </Button> */}
        <Button 
          variant="contained" 
          endIcon={<ArrowForwardIcon />} 
          onClick={() => handleTab('2')} 
          sx={{ borderRadius: '20px', width: '45%', backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0' }}}
        >
          続行
        </Button>
      </Box>
    </Box>
	)

}

export default TermCondition;