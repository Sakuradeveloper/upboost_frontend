import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { useAppSelector } from '@/store/hooks';

interface ChapterListPageProps {
    id: string;
}

const ChapterListPage: React.FC<ChapterListPageProps> = ({id}) => {

    const subjects = useAppSelector(state => state.subject.items.result);
    
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {subjects.data?.filter((item) => item.id == id).map((subject) => (
                <Box key={subject.id}>
                    {/* Subject Title */}
                    <Typography 
                        variant="h5" 
                        gutterBottom 
                        sx={{ 
                            fontWeight: 'bold', 
                            mb: 3, 
                            fontSize: { xs: '1.4rem', md: '1.8rem' }, 
                            color: 'primary.main'
                        }}
                    >
                        {subject.title}
                    </Typography>

                    {/* Chapter List */}
                    <Grid container spacing={4}>
                        {subject.chapters?.map((chapter: any) => (
                            <Grid item xs={12} key={chapter.id}>
                                <Box 
                                    sx={{ 
                                        borderBottom: '1px solid #e0e0e0', 
                                        pb: 2, 
                                        mb: 3, 
                                        '&:last-child': { borderBottom: 'none' }
                                    }}
                                >
                                    {/* Chapter Number */}
                                    <Typography 
                                        variant="subtitle1" 
                                        sx={{ 
                                            color: 'primary.main', 
                                            fontWeight: 'bold',
                                            fontSize: { xs: '1rem', md: '1.2rem' } 
                                        }} 
                                        gutterBottom
                                    >
                                        第{chapter.order}章
                                    </Typography>

                                    {/* Chapter Title */}
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            fontWeight: 'bold', 
                                            mb: 1, 
                                            fontSize: { xs: '1rem', md: '1.2rem' }, 
                                            color: 'text.primary'
                                        }}
                                        gutterBottom
                                    >
                                        {chapter.title}
                                    </Typography>

                                    {/* Chapter Description */}
                                    <Typography 
                                        variant="body2" 
                                        color="textSecondary" 
                                        sx={{ 
                                            fontSize: { xs: '0.9rem', md: '1rem' }, 
                                            lineHeight: 1.6,
                                            color: 'text.secondary'
                                        }}
                                    >
                                        {chapter.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Container>

    );
};

export default ChapterListPage;