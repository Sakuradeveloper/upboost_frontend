import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Container, Grid, Typography, Box, Paper, Button, IconButton, Modal, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Add, SendOutlined } from '@mui/icons-material';
import { styled, width, display } from '@mui/system';
import { useAppSelector } from '@/store/hooks';
import QuestionBuilder from '../components/Question';
import { postFormdata, postRequest } from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function Home() {
  
  const { user } = useAuth();
  const questions = useAppSelector(state => state.online_test.items.result.data);
  const [problems, setProblems] = useState<any[]>([]); // Problems from the database (left side)
  const [selectedProblems, setSelectedProblems] = useState<any[]>([]); // Selected problems (right side)
  const [openModal, setOpenModal] = useState(false); // State for modal
  const [newProblem, setNewProblem] = useState(''); // State for new problem input
  const chapter_id = 12;
  // Fetch problems from the database (simulate with mock data)
  console.log("problems : ", problems)
  useEffect(() => {
    setProblems(questions);
  }, [questions]);

  // Handle drag-and-drop logic
  const handleOnDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    const problemsClone = Array.from(problems);
    const selectedClone = Array.from(selectedProblems);

    // Moving from left to right
    if (source.droppableId === 'problemList' && destination.droppableId === 'selectedProblems') {
      const [draggedProblem] = problemsClone.splice(source.index, 1);
      selectedClone.splice(destination.index, 0, draggedProblem);
    }

    // Moving from right to left
    else if (source.droppableId === 'selectedProblems' && destination.droppableId === 'problemList') {
      const [draggedProblem] = selectedClone.splice(source.index, 1);
      problemsClone.splice(destination.index, 0, draggedProblem);
    }
    console.log("problemsClone : ", problemsClone)
    console.log("selectedClone : ", selectedClone)
    setProblems(problemsClone);
    setSelectedProblems(selectedClone);
  };

  // Add a new problem to the available problems list
  const handleAddProblem = () => {
    const newProblemData = {
      id: (problems.length + 1).toString(),
      question: newProblem,
    };
    setProblems([...problems, newProblemData]);
    setNewProblem('');
    setOpenModal(false); // Close modal after adding
  };

  const addNewQuestion = async (newQuestion: any) => {
    console.log("newQuestion : ", newQuestion)
    const formData = new FormData();
    formData.append('question', newQuestion.question);
    formData.append('options', JSON.stringify(newQuestion.options));
    formData.append('correctAnswer', newQuestion.correctAnswer.toString());
    formData.append('playCount', newQuestion.playCount.toString());
    formData.append('weight', newQuestion.weight.toString());
    {console.log("problems=====??????????>>>>>>>>>>>", problems)}
    if (newQuestion?.image) {
      formData.append('image', newQuestion.image);
    }

    if (newQuestion?.audio) {
      formData.append('audio', newQuestion.audio);
    }

    const res = await postFormdata(`/v0/teacher/upload/`, formData);

    if (res.status == 200) {
        // dispatch(clearError());
        // refresh && refresh();
        setProblems([...problems, {...res.data.data, options:JSON.parse(res.data.data.options)}]);
        setOpenModal(false);
    }
    if (res.status == 422 && res.data.errors) {
        // dispatch(setError(res.data.errors));
        console.log("res.data.errors : ", res.data.errors)
        setOpenModal(false);
    }
  };

  const handleSubmitProblem = async() =>{
    const res = await postRequest(`/v0/teacher/problems/`, 
      {
        user_id: user?.id,
        // chapter_id: chapter_id,
        selectedProblems
      });

    if (res.status == 200) {
        // dispatch(clearError());
        // refresh && refresh();

        // setOpenModal(false);
    }
    if (res.status == 422 && res.data.errors) {
        // dispatch(setError(res.data.errors));
        console.log("res.data.errors : ", res.data.errors)
        // setOpenModal(false);
    }
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        試験問題の作成
      </Typography>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Grid container spacing={4}>
          {/* Left side: Problem list */}
          <Grid item xs={6}>
            <StyledPaper>
              <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Typography variant="h6" color="primary">
                  提出可能な問題
                </Typography>
                <IconButton color="primary" onClick={() => setOpenModal(true)}>
                  <Add />
                </IconButton>
              </Box>

              <Droppable droppableId="problemList">
                {(provided) => (
                  <ScrollableBox>
                  <Box ref={provided.innerRef} {...provided.droppableProps} minHeight={4}>
                    
                    {problems.map((problem, index) => (
                      <Draggable key={problem.id.toString()} draggableId={problem.id.toString()} index={index}>
                        {(provided, snapshot) => (
                          // <Box
                          //   ref={provided.innerRef}
                          //   {...provided.draggableProps}
                          //   {...provided.dragHandleProps}
                          //   sx={{
                          //     padding: 2,
                          //     marginBottom: 2,
                          //     backgroundColor: snapshot.isDragging
                          //       ? 'primary.light'
                          //       : 'background.paper',
                          //     border: '1px solid',
                          //     borderRadius: 2,
                          //     boxShadow: snapshot.isDragging ? 5 : 1,
                          //     cursor: 'grab',
                          //   }}
                          // >
                          //   {problem.question}
                          // </Box>
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              padding: 2,
                              marginBottom: 2,
                              backgroundColor: snapshot.isDragging
                                ? 'primary.light'
                                : 'background.paper',
                              border: '1px solid',
                              borderRadius: 2,
                              boxShadow: snapshot.isDragging ? 5 : 1,
                              cursor: 'grab',
                            }}>
                            <Typography variant="h6">
                              {index + 1}. {problem.question}
                            </Typography>

                            {problem.dropbox_image_url && (
                              <Box mt={2} mb={2} sx={{width: '200px', margin: 'auto'}}>
                                <Image src={problem.dropbox_image_url} alt={`Question ${index + 1}`} style={{ width: '100%' }} />
                              </Box>
                            )}

                            {problem.dropbox_audio_url && (
                              <Box mt={2} mb={2}>
                                <Typography variant="h6">
                                  残りプレイ回数: {problem.repeat}
                                </Typography>

                                <Box mt={2} mb={2}>
                                  {/* Disable controls if no plays are left */}
                                  <audio
                                    // ref={(el) => (audioRefs.current[question.id] = el)}
                                    controls={problem.repeat > 0} // Disable controls when playCount reaches 0
                                    // onPlay={() => handlePlayAudio(question.id)}
                                    // onEnded={() => handleStopAudio(question.id)}
                                    // onPause={() => handlePauseAudio(question.id)}
                                  >
                                    <source
                                      src={problem.dropbox_audio_url}
                                      type="audio/mp3"
                                    />
                                    Your browser does not support the audio element.
                                  </audio>
                                </Box>

                                {/* {playCounts[question.id] === 0 && (
                                  <Typography variant="body1" color="error">
                                    No plays remaining.
                                  </Typography>
                                )} */}
                              </Box>
                            )}

                            {/* Render the options as radio buttons */}
                            <RadioGroup
                              value={problem.correct_answer}
                            >
                              {problem.options.map((option: string, optionIndex: number) => (
                                <FormControlLabel
                                  key={optionIndex}
                                  value={optionIndex}
                                  control={<Radio />}
                                  label={option}
                                />
                              ))}
                            </RadioGroup>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                  </ScrollableBox>
                )}
              </Droppable>
            </StyledPaper>
          </Grid>

          {/* Right side: Selected problems */}
          <Grid item xs={6}>
            <StyledPaper>
              <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Typography variant="h6" color="primary">
                  選択した問題
                </Typography>
                <IconButton color="primary" onClick={handleSubmitProblem}>
                  <SendOutlined />
                </IconButton>
              </Box>
              
              <Droppable droppableId="selectedProblems">
                {(provided) => (
                  <ScrollableBox>
                  <Box ref={provided.innerRef} {...provided.droppableProps} minHeight={4}>
                    {selectedProblems.map((problem, index) => (
                      <Draggable key={problem.id.toString()} draggableId={problem.id.toString()} index={index}>
                        {(provided, snapshot) => (
                          <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            padding: 2,
                            marginBottom: 2,
                            backgroundColor: snapshot.isDragging
                              ? 'primary.light'
                              : 'background.paper',
                            border: '1px solid',
                            borderRadius: 2,
                            boxShadow: snapshot.isDragging ? 5 : 1,
                            cursor: 'grab',
                          }}>
                          <Typography variant="h6">
                            {index + 1}. {problem.question}
                          </Typography>

                          {problem.dropbox_image_url && (
                            <Box mt={2} mb={2} sx={{width: '200px', margin: 'auto'}}>
                              <Image src={problem.dropbox_image_url} alt={`Question ${index + 1}`} style={{ width: '100%' }} />
                            </Box>
                          )}

                          {problem.dropbox_audio_url && (
                            <Box mt={2} mb={2}>
                              <Typography variant="h6">
                                残りプレイ回数: {problem.repeat}
                              </Typography>

                              <Box mt={2} mb={2}>
                                {/* Disable controls if no plays are left */}
                                <audio
                                  // ref={(el) => (audioRefs.current[question.id] = el)}
                                  controls={problem.repeat > 0} // Disable controls when playCount reaches 0
                                  // onPlay={() => handlePlayAudio(question.id)}
                                  // onEnded={() => handleStopAudio(question.id)}
                                  // onPause={() => handlePauseAudio(question.id)}
                                >
                                  <source
                                    src={problem.dropbox_audio_url}
                                    type="audio/mp3"
                                  />
                                  Your browser does not support the audio element.
                                </audio>
                              </Box>

                              {/* {playCounts[question.id] === 0 && (
                                <Typography variant="body1" color="error">
                                  No plays remaining.
                                </Typography>
                              )} */}
                            </Box>
                          )}

                          {/* Render the options as radio buttons */}
                          <RadioGroup
                            value={problem.correct_answer}
                          >
                            {problem.options.map((option: string, optionIndex: number) => (
                              <FormControlLabel
                                key={optionIndex}
                                value={optionIndex}
                                control={<Radio />}
                                label={option}
                              />
                            ))}
                          </RadioGroup>
                        </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                  </ScrollableBox>
                )}
              </Droppable>
            </StyledPaper>
          </Grid>
        </Grid>
      </DragDropContext>

      {/* Modal for adding a new problem */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          {/* <Typography variant="h6">Add New Problem</Typography>
          <TextField
            label="Problem"
            value={newProblem}
            onChange={(e) => setNewProblem(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            onClick={handleAddProblem}
            variant="contained"
            color="primary"
            disabled={!newProblem.trim()}
          >
            Add Problem
          </Button> */}
          <QuestionBuilder addQuestion={addNewQuestion} />
        </Box>
      </Modal>
    </Container>
  );
}

// Styled components for a more flexible and beautiful design
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
//   boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}));

// Modal styling
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ScrollableBox = styled(Box)(({ theme }) => ({
  maxHeight: '55vh', // Fixed height for scrollable area
  overflowY: 'auto',  // Enable vertical scrolling
}));
