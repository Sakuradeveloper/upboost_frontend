import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/customer';
import moment from 'moment';

import { Button, Card, CardContent, CardMedia, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import {IUser} from '@/interfaces/index';

interface TeacherCardProps {
    teacher: any;
  }

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
    const { name, phone } = teacher.user_info;

    const { user } = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const filter = useAppSelector(state => state.customer.items.filter);
    const result = useAppSelector(state => state.customer.items.result);

    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia component="img" height="140" image="{}" alt={name} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Phone: {phone}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                Hobbies: {hobbies}
                </Typography> */}
            </CardContent>  
        </Card>
    );
};

export default TeacherCard;
