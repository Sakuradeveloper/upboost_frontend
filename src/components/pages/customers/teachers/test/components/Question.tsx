import { useState } from 'react';
import {
  TextField, Button, Box, FormControlLabel, Radio, IconButton, Input, Typography, Grid, CircularProgress, Snackbar, Alert
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

const QuestionBuilder = ({ addQuestion }: { addQuestion: any }) => {
  const { refresh } = useAuth();
  const dispatch = useAppDispatch();

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['']);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [playCount, setPlayCount] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [weight, setWeight] = useState<number | null>(1);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setAudio(event.target.files[0]);
    }
  };

  const handleAddOption = () => {
    if (options.length >= 5) {
      setError('You cannot add more than 5 options.');
      return;
    }
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleDeleteOption = (index: number) => {
    if (options.length <= 2) {
      setError('少なくとも 2 つのアイテムが必要です。');
      return;
    }
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!question.trim()) {
      setError('有効な質問を入力してください。');
      return;
    }

    if (options.some((opt) => opt.trim() === '')) {
      setError('すべてのオプションが入力されていることを確認してください。');
      return;
    }

    setLoading(true);

    const newQuestion = {
      question,
      type: 'radio',
      options,
      correctAnswer,
      weight,
      image,
      audio,
      image_url: image ? URL.createObjectURL(image) : null,
      audio_url: audio ? URL.createObjectURL(audio) : null,
      playCount,
    };
    console.log("newQuestion: =>>>>>>>>>>", newQuestion)

    // Simulate API call (uncomment your API logic here)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      addQuestion(newQuestion);
      setQuestion('');
      setOptions(['']);
      setImage(null);
      setAudio(null);
      setPlayCount(1);
    }, 2000);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        新しい質問を追加
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="問題"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
            required
          />
        </Grid>

        <Grid item xs={12}>
            <TextField
              label="問題比重"
              value={weight}
              type='number'
              onChange={(e) => setWeight(Number(e.target.value))}
              fullWidth
              margin="normal"
              variant="outlined"
              inputProps={{ min: 1 }}
            />
          </Grid>

        <Grid item xs={12} md={12}>
          <Input
            type="file"
            inputProps={{ accept: 'image/*' }}
            onChange={handleImageUpload}
          />
          {image && (
            <Box mt={2}>
              <Image src={URL.createObjectURL(image)} alt="Uploaded Image" style={{ maxWidth: '100%' }} />
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={12}>
          <Input
            type="file"
            inputProps={{ accept: 'audio/*' }}
            onChange={handleAudioUpload}
          />
          {audio && (
            <Box mt={2}>
              <audio controls>
                <source src={URL.createObjectURL(audio)} type="audio/mpeg" />
                  Your browser does not support the audio element.
              </audio>
            </Box>
          )}
        </Grid>

        {audio && (
          <Grid item xs={12}>
            <TextField
              label="プレイ回数"
              type="number"
              value={playCount}
              onChange={(e) => setPlayCount(Number(e.target.value))}
              fullWidth
              margin="normal"
              variant="outlined"
              inputProps={{ min: 1 }}
            />
          </Grid>
        )}

        <Grid item xs={12}>
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
                          display="flex"
                          alignItems="center"
                          mb={2}
                        >
                          <TextField
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            label={`アイテム ${index + 1}`}
                            fullWidth
                            required
                          />

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

          <Button onClick={handleAddOption} variant="outlined" sx={{ marginY: 2 }}>
            アイテムを追加
          </Button>
        </Grid>

        <Grid item xs={12} textAlign="right">
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Saving...' : '追加'}
          </Button>
        </Grid>
      </Grid>

      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Question added successfully!
        </Alert>
      </Snackbar>

      {error && (
        <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default QuestionBuilder;
