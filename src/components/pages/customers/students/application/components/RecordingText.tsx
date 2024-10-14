import { setCurrentItemValue } from "@/store/features/lesson_application";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface RecordingTextProps {
	handleTab: (value: string) => void;
}

const RecordingText: React.FC<RecordingTextProps> = ({ handleTab }) => {
	const dispatch = useAppDispatch();
	const result = useAppSelector((state) => state.lesson_application.item);

	return (
		<Box sx={{ padding: 3, backgroundColor: '#f4f6f8', borderRadius: 2, boxShadow: 2}}>
			<FormControl component="fieldset" sx={{ marginBottom: 4, display:'block' }} error={Boolean(result.errors.recording)} required>
				<FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>
					レッスン録画共有を希望しますか？
				</FormLabel>
				<Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2, lineHeight: '1.5' }}>
					講師が毎回のレッスンを録画し、終了後にDropboxを通じて受講者に共有するサービスです。<br />
					このサービスを利用することで、復習が容易になり、レッスン中は会話に集中することができます。
				</Typography>
				<RadioGroup
					aria-label="recording"
					name="recording"
					value={result.form.recording}
					onChange={(e) => dispatch(setCurrentItemValue({ recording: e.target.value }))}
					sx={{ marginBottom: 2 }}
				>
					<FormControlLabel value="yes" control={<Radio />} label="はい (1レッスンあたり +275円/月額)" />
					<FormControlLabel value="no" control={<Radio />} label="いいえ" />
				</RadioGroup>
				{result.errors.recording && <FormHelperText error>必須です。</FormHelperText>}
			</FormControl>

			<FormControl component="fieldset" sx={{ marginBottom: 4, display:'block' }} error={Boolean(result.errors.book)} required>
				<FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>
					参考書の形式について、データ版を購入する
				</FormLabel>
				<Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
					究極のベトナム語攻略ブック 初級編は合計3冊ございます。
				</Typography>
				<RadioGroup
					aria-label="book"
					name="book"
					value={result.form.book}
					onChange={(e) => dispatch(setCurrentItemValue({ book: e.target.value }))}
				>
					<FormControlLabel value="yes" control={<Radio />} label="究極のベトナム語攻略ブック 初級編(1-20頁) (1,400円) [PDF]" />
				</RadioGroup>
				{result.errors.book && <FormHelperText error>必須です。</FormHelperText>}
			</FormControl>

			<FormControl component="fieldset" sx={{ marginBottom: 4, display:'block' }} error={Boolean(result.errors.vocabulary)} required>
				<FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>
					単語帳は購入されますか？
				</FormLabel>
				<Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
					・『究極のベトナム語単語ブック』は、3600以上の単語と1600以上の例文を収録しており、日常会話からビジネスシーンまで対応する幅広いフレーズが特徴です。<br />
					・ロアンのベトナム語講座の申し込み時に限り、3,300円ではなく「2,800円（税込）」で購入できます。
				</Typography>
				<RadioGroup
					aria-label="vocabulary"
					name="vocabulary"
					value={result.form.vocabulary}
					onChange={(e) => dispatch(setCurrentItemValue({ vocabulary: e.target.value }))}
				>
					<FormControlLabel value="yes" control={<Radio />} label="はい (1レッスンあたり +275円/月額)" />
					<FormControlLabel value="no" control={<Radio />} label="いいえ" />
				</RadioGroup>
				{result.errors.vocabulary && <FormHelperText error>必須です。</FormHelperText>}
			</FormControl>

			<Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => handleTab('2')} 
          sx={{ borderRadius: '20px', width: '45%', color: '#1976d2', borderColor: '#1976d2', '&:hover': { borderColor: '#1565c0' } }}
        >
          戻る
        </Button>
        <Button 
          variant="contained" 
          endIcon={<ArrowForwardIcon />} 
          onClick={() => handleTab('4')} 
          sx={{ borderRadius: '20px', width: '45%', backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0' }}}
        >
          続行
        </Button>
      </Box>
		</Box>
	);
};

export default RecordingText;
