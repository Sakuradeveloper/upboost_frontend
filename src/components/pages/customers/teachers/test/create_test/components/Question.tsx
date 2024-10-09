// components/QuestionBuilder.tsx

import { useState } from 'react';
import { TextField, Button, Box, FormControlLabel, Radio, IconButton, Input } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import { postFormdata } from '@/utils/axios';
import { useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/contexts/AuthContext';

const QuestionBuilder = ({ addQuestion }: { addQuestion: any }) => {
  const { refresh, setPending, user } = useAuth();
  const dispatch = useAppDispatch();

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['']);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [playCount, setPlayCount] = useState<number>(1); // Default 1 repetition

  // Handle Local Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  // Handle Local Audio Upload
  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setAudio(file);
    }
  };

  const handleAddOption = () => setOptions([...options, '']);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleDeleteOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    const newQuestion = {
      question,
      type: 'radio',
      options,
      correctAnswer,
      image: image ? URL.createObjectURL(image) : null,
      audio: audio ? URL.createObjectURL(audio) : null, // Store audio file path
      playCount, // Number of times the audio can be played
    };

    const formData = new FormData();
    formData.append('question', question);
    formData.append('options', JSON.stringify(options));
    formData.append('correctAnswer', correctAnswer.toString());
    formData.append('playCount', playCount.toString());

    if (image) {
      formData.append('image', image);
    }

    if (audio) {
      formData.append('audio', audio);
    }

    const res = await postFormdata(`/v0/teacher/upload/`, formData);

    if (res.status == 200) {
        // dispatch(clearError());
        refresh && refresh();
    }
    if (res.status == 422 && res.data.errors) {
        // dispatch(setError(res.data.errors));
        console.log("res.data.errors : ", res.data.errors)
    }

    addQuestion(newQuestion);
    setQuestion('');
    setOptions(['']);
    setImage(null);
    setAudio(null);
    setPlayCount(1);
  };

  return (
    <Box>
      <TextField
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
      />

      {/* Upload Local Image */}
      <Input
        type="file"
        inputProps={{ accept: 'image/*' }} // Only accept image files
        onChange={handleImageUpload}
      />
      {image && <p>{image.name}</p>}

      {/* Upload Local Audio */}
      <Input
        type="file"
        inputProps={{ accept: 'audio/*' }} // Only accept audio files
        onChange={handleAudioUpload}
      />
      {audio && <p>{audio.name}</p>}

      {/* Set Number of Audio Repetitions, only visible if audio is uploaded */}
      {audio && (
        <TextField
          label="Number of Audio Plays"
          type="number"
          value={playCount}
          onChange={(e) => {
            const value = Number(e.target.value);
            setPlayCount(value);
          }}
          fullWidth
          margin="normal"
          inputProps={{ min: 1 }} // Minimum value is 1
          variant="outlined"
        />
      )}

      {/* Drag and Drop for options */}
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="options">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {options.map((option, index) => (
                <Draggable key={index} draggableId={String(index)} index={index}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      marginBottom={2}
                      display="flex"
                      alignItems="center"
                    >
                      <TextField
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        label={`Option ${index + 1}`}
                        fullWidth
                      />

                      {/* Delete Option Button */}
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteOption(index)}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <Radio
                        checked={correctAnswer === index}
                        onChange={() => setCorrectAnswer(index)}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      <Button onClick={handleAddOption}>Add Option</Button>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Add Question
      </Button>
    </Box>
  );
};

export default QuestionBuilder;
