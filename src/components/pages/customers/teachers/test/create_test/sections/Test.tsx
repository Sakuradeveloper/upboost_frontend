import { useState } from 'react';
import { Button, Container, Grid, Typography, Box } from '@mui/material';
import QuestionBuilder from '../components/Question';
import TestPreview from '../components/TestPreview';

export default function Test() {
    const [questions, setQuestions] = useState<any[]>([]);

    // Add new question to the list
    const handleAddQuestion = (newQuestion: any) => {
      setQuestions([...questions, newQuestion]);
    };

    // Delete a specific question
    const handleDeleteQuestion = (index: number) => {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
    };

    return (
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Online Test Builder
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <QuestionBuilder addQuestion={handleAddQuestion} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TestPreview questions={questions} deleteQuestion={handleDeleteQuestion} />
          </Grid>
        </Grid>
      </Container>
    );
}
