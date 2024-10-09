import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';
// import styled from 'styled-components';
import { styled } from '@mui/material/styles';

interface CourseTileProps {
  courseName: string;
  progress: number;
  nextChapter: string;
}

const CourseCard = styled(Card)`
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProgressBox = styled(Box)`
  margin-top: 1rem;
`;

const CourseTile: React.FC<CourseTileProps> = ({ courseName, progress, nextChapter }) => {
  return (
    <CourseCard>
      <CardContent>
        <Typography variant="h6">{courseName}</Typography>
        <Typography variant="body2" color="textSecondary">
          Next: {nextChapter}
        </Typography>
        <ProgressBox>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2">{progress}% completed</Typography>
        </ProgressBox>
      </CardContent>
    </CourseCard>
  );
};

export default CourseTile;
