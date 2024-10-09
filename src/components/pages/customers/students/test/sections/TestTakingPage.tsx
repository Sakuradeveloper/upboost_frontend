import { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Button, Radio, RadioGroup, FormControlLabel, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useAuth } from '@/contexts/AuthContext';
import AudioPlayer from 'material-ui-audio-player';

import { AiFillStop, AiFillPlayCircle, AiFillPauseCircle, AiFillHome } from 'react-icons/ai';
import { postRequest } from '@/utils/axios';

// Sample test-taking component
const TestTakingPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const questions = useAppSelector(state => state.online_test.items.result.data);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [playCounts, setPlayCounts] = useState<{ [key: number]: number }>({});
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});
  const chapterId = 12;
  const teacherId = 8;
  console.log("questions : ", questions)

  // Initialize play counts based on the question's repeat value
  useEffect(() => {
    const initialPlayCounts = questions.reduce((acc: any, question: any) => {
      acc[question.id] = question.repeat;
      return acc;
    }, {});
    setPlayCounts(initialPlayCounts);
  }, [questions]);

  // Handle answer selection for each question
  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  // Handle playing the audio with limited repetitions
  const handlePlayAudio = (questionId: number) => {
    if (playCounts[questionId] > 0) {
      setPlayCounts({
        ...playCounts,
        [questionId]: playCounts[questionId] - 1
      });
    } else {
      // Pause the audio if no plays are left
      if (audioRefs.current[questionId]) {
        audioRefs.current[questionId]?.pause();
      }
    }
  };

  const handlePauseAudio = (questionId: number) => {
    if (audioRefs.current[questionId]) {
      audioRefs.current[questionId]?.pause();
    }
  };

  const handleStopAudio = (questionId: number) => {
    if (audioRefs.current[questionId]) {
      audioRefs.current[questionId]?.pause();
      audioRefs.current[questionId].currentTime = 0; // Reset to the beginning
    }
  };

  // Calculate the score when the test is submitted
  const handleSubmit = async() => {
    let score = 0;
    // questions.forEach((question) => {
    //   if (answers[question.id] === question.correct_answer) {
    //     score += 1;
    //   }
    // });
    // console.log("score : ", score);
    // console.log("answer : ", answers);


    // setScore(score);
    setSubmitted(true);

    try {
      const response = await postRequest(`v0/student/submit-test/${user?.id}`, {
        user_id : user?.id,
        chapter_id: chapterId,
        answers: answers,
        teacher_id : teacherId
      });

      const { score } = response.data;
      setScore(score);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  return (
    <Container sx={{
      position: 'relative',
    }}>
      <Typography variant="h4" gutterBottom align="center">
        テスト
      </Typography>

      {/* Test Questions */}
      {questions.map((question, index) => (
        <Box key={question.id} mb={4} p={3} border={1} borderRadius={2}>
          <Typography variant="h6">
            {index + 1}. {question.question}
          </Typography>

          {/* Display image if provided */}
          {question.dropbox_image_url && (
            <Box mt={2} mb={2}>
              <img src={question.dropbox_image_url} alt={`Question ${index + 1}`} style={{ width: '100%' }} />
            </Box>
          )}

          {/* Display audio player */}
          {question.dropbox_audio_url && (
            <Box mt={2} mb={2}>
              <Typography variant="h6">
                残りプレイ回数: {playCounts[question.id]}
              </Typography>

              <Box mt={2} mb={2}>
                {/* Disable controls if no plays are left */}
                <audio
                  ref={(el) => (audioRefs.current[question.id] = el)}
                  controls={playCounts[question.id] > 0} // Disable controls when playCount reaches 0
                  onPlay={() => handlePlayAudio(question.id)}
                  onEnded={() => handleStopAudio(question.id)}
                  onPause={() => handlePauseAudio(question.id)}
                >
                  <source
                    src={question.dropbox_audio_url}
                    type="audio/mp3"
                  />
                  Your browser does not support the audio element.
                </audio>
              </Box>

              {playCounts[question.id] === 0 && (
                <Typography variant="body1" color="error">
                  残りプレイはありません。
                </Typography>
              )}
            </Box>
          )}

          {/* Render the options as radio buttons */}
          <RadioGroup
            value={answers[question.id] ?? null}
            onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
          >
            {question.options.map((option: string, optionIndex: number) => (
              <FormControlLabel
                key={optionIndex}
                value={optionIndex}
                control={question.is_tested ? <Radio checked={question.answer == optionIndex?true:false}/> : <Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </Box>
      ))}

      {/* Submit Button */}
      {!submitted && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            テスト提出
          </Button>
        </Box>
      )}

      {/* Display Score after Submission */}
      {submitted && (
        <Box mt={4} textAlign="center" sx={{position:'absolute', top:'20%', right:"30%"}}>
          <Typography variant="h5" sx={{color:'#f0032e', fontSize:28}}>
            {score} / {questions.length}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default TestTakingPage;
