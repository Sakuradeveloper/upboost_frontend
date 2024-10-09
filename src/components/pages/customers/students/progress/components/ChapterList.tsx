import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, LinearProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';

interface ChapterListProps {
  chapters: { 
		title: string; 
		progress: number; 
		completed: boolean; 
		chapterInfo: {
			title:string;
			order:number;
			id:number;
      chapter_type:string;
		}
	}[];
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters }) => {
  console.log("chapters : ", chapters)
  return (
    <Box>
      {chapters.map((chapter, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography>第 {chapter.chapterInfo.order} 章</Typography>
            <Typography>{chapter.chapterInfo.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {chapter.chapterInfo.chapter_type === 'Test' ?
              <Link href={`test?chapter_id=${chapter.chapterInfo.id}`}>
                <LinearProgress variant="determinate" value={chapter.progress} />
                <Typography>{chapter.progress}% 完了</Typography>
              </Link>:
              <Link href={``}>
                <LinearProgress variant="determinate" value={chapter.progress} />
                <Typography>{chapter.progress}% 完了</Typography>
              </Link>
              }
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ChapterList;
