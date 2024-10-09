import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/customer';
import moment from 'moment';

import { Box, Button, Grid, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TeacherCard from '../components/TeacherCard';


interface Props {
    search_url?: string;
}

interface Teacher {
    id: number;
    name: string;
    phone: string;
  }

const TeacherList = () => {
    const { user } = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const filter = useAppSelector(state => state.teacher.items.filter);
    const result = useAppSelector(state => state.teacher.items.result);

    console.log(result.data.filter(item=>{return item.user_info.role.role_id === 'teacher'}), "========================================");
    return (
        <>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <Grid container spacing={2}>
                    {result.data.map((teacher) => (
                    <Grid item xs={12} sm={6} md={4} key={teacher.id}>
                        <TeacherCard teacher={teacher} />
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default TeacherList;
