import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { setCurrentItemValue } from '@/store/features/customer';
import { fetchPropertyData, fetchStatusData } from '@/store/features/shared_data';

import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Switch, TextField, Typography, SelectChangeEvent, Grid, Card, CardMedia, CardContent, Link } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';
import { clearCurrentItem, setCurrentItem, setCurrentItemValue, setError } from '@/store/features/subject';
import { postRequest } from '@/utils/axios';

const SubjectList = () => {
    const dispatch = useAppDispatch();
    const compareLocation = (location: string) => location == 'northern' ?  '標準語(北部弁)' : location === 'southern' ? '南部弁' :'中部弁'
    const comparelevel = (location: string) => location == 'beginner' ?  '初心者向け' : '中級者向け'

    const currentItem = useAppSelector(state => state.subject.item.form);
    const subjects = useAppSelector(state => state.subject.items.result);
    const errors = useAppSelector(state => state.customer.item.errors);
    const shared_data = useAppSelector(state => state.shared_data);

    return (
        <>
           <Container maxWidth="lg" sx={{ mt: 4 }}>
                {/* Textbook Grid */}
                <Grid container spacing={4} justifyContent="center">
                    {subjects.data?.map((book) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                            <Card 
                                sx={{ 
                                    border: '1px solid #e0e0e0', 
                                    boxShadow: 'none', 
                                    borderRadius: '12px', 
                                    p: 3, 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'space-between', 
                                    height: '100%',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                                    {/* Textbook Title */}
                                    <Typography variant="h6" gutterBottom>
                                        {book.title || 'Title Not Available'}
                                    </Typography>
                                    {/* Language and Level */}
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        {compareLocation(book.type)} <br /> {comparelevel(book.level)}
                                    </Typography>
                                    {/* Number of Chapters */}
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        章: {book.chapters?.length || 0}
                                    </Typography>
                                </CardContent>

                                {/* View Details Button */}
                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    <Button 
                                        variant="contained"  
                                        color="secondary" 
                                        href={`/admin/chapters/${book.id}`} 
                                        component={Link} 
                                        fullWidth 
                                        sx={{
                                            borderRadius: '20px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        詳細を表示
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default SubjectList;
