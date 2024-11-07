// components/TestPreview.tsx

import { Box, Typography, RadioGroup, FormControlLabel, Radio, Button, IconButton } from '@mui/material';
import { useState, useRef } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

const TestPreview = ({ questions, deleteQuestion }: { questions: any[], deleteQuestion: (index: number) => void }) => {
  const [playCounts, setPlayCounts] = useState<number[]>(questions.map(q => q.playCount || 1)); // Initialize based on the playCount set by teacher
  const audioRefs = useRef<HTMLAudioElement[]>([]); // Store references to audio elements

  const handlePlayAudio = (index: number) => {
    if (playCounts[index] > 0 && audioRefs.current[index]) {
      audioRefs.current[index].play();
      const updatedCounts = [...playCounts];
      updatedCounts[index] -= 1;
      setPlayCounts(updatedCounts);
    }
  };

  const handlePauseAudio = (index: number) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].pause();
    }
  };

  const handleStopAudio = (index: number) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].pause();
      audioRefs.current[index].currentTime = 0; // Reset to the beginning
    }
  };

  return (
    <Box>
      <Typography variant="h5">Test Preview</Typography>
      {questions.map((question, index) => (
        <Box key={index} marginY={2} border={1} padding={2}>
          <Typography variant="h6">{question.question}</Typography>

          {/* Display image if available */}
          {question.image && <img src={question.image} alt="question image" width="100%" />}

          {/* Display audio player with play count restriction */}
          {question.audio && (
            <Box display="flex" alignItems="center">
              <audio ref={(el) => (audioRefs.current[index] = el!)} preload="auto">
                <source src={question.audio} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>

              {playCounts[index] > 0 ? (
                <>
                  <IconButton color="primary" onClick={() => handlePlayAudio(index)}>
                    <PlayArrowIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handlePauseAudio(index)}>
                    <PauseIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleStopAudio(index)}>
                    <StopIcon />
                  </IconButton>
                  <Typography>Plays remaining: {playCounts[index]}</Typography>
                </>
              ) : (
                <Typography>No plays remaining.</Typography>
              )}
            </Box>
          )}

          <RadioGroup>
            {question.options.map((option: string, idx: number) => (
              <FormControlLabel
                key={idx}
                value={option}
                control={<Radio checked={question.correctAnswer === idx} />}
                label={option}
              />
            ))}
          </RadioGroup>

          {/* Delete Button for Questions */}
          <Button variant="contained" color="secondary" onClick={() => deleteQuestion(index)}>
            Delete Question
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default TestPreview;
