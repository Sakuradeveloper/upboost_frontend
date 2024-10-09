'use client';

import { Box, Container, Grid, Typography, LinearProgress } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
// import styled from 'styled-components';
import { styled } from '@mui/material/styles';
import CourseTile from './components/CourseTitle'; // Course Tile Component
import ChapterList from './components/ChapterList';
import { useEffect, useMemo } from 'react';
import { fetchProgressStudent } from '@/store/features/progress';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useAuth } from '@/contexts/AuthContext';

const chapters_moko = [
  {title:'title1', progress:50, completed:true},
  {title:'title2', progress:60, completed:false},
  {title:'title3', progress:70, completed:false},
  {title:'title4', progress:80, completed:true},
]

const ProgressContainer = styled(Box)`
  padding: 2rem 0;
`;

export default function ProgressPage() {
  const { user} = useAuth();
  const dispatch = useAppDispatch();
  const teacher = 20;

  const progress = useAppSelector(state => state.progress.items.result.data);

  const data = useMemo(()=>{
    return {user:user?.id, teacher:teacher}
},[user])


  useEffect(()=>{
    if(user?.id){
      console.log("fetchprogressStudent")
      dispatch(fetchProgressStudent(user?.id))
    }
  },[data, dispatch, user?.id])
  return (
    <AuthLayout>
        <PermissionLayout permission={['customer']} role={['admin', 'student']}>
            <MainLayout>
                <TitleBar>進捗トラッキング</TitleBar>
                <MainPannel>
                    <Container>
                        <Typography variant="h4" gutterBottom>
                          学習の進捗状況
                        </Typography>
                        <ProgressContainer>
                            <LinearProgress variant="determinate" value={70} />
                            <Typography variant="body1" align="center">
                              70% 完了
                            </Typography>
                        </ProgressContainer>
                        {/* <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} md={4}>
                            <CourseTile courseName="Course 1" progress={80} nextChapter="Chapter 5" />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                            <CourseTile courseName="Course 2" progress={50} nextChapter="Chapter 3" />
                            </Grid>
                        </Grid> */}
                        <Grid>
                            <ChapterList chapters={progress}/>
                        </Grid>
                    </Container>
                </MainPannel>
            </MainLayout>
        </PermissionLayout>
    </AuthLayout>
    
  );
}
