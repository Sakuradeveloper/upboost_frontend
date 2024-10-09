import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCustomers, reset, setFilterValue } from '@/store/features/customer';
import { fetchPropertyData, fetchStatusData } from '@/store/features/shared_data';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import { fetchUsers } from '@/store/features/user';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, ListItemButton } from '@mui/material';
// import Filter from './sections/Filter';
// import CustomerTable from './sections/CustomerTable';
// import TablePagination from './sections/TablePagination';
import { fetchStudent } from '@/store/features/student';
import ChatRoom from './ChatRoom';
import { fetchChat } from '@/store/features/chat';
import { Student } from '@/interfaces';
import theme from '@/components/templates/themes';
// import Student from '@/store/features/student';

interface props{
    setSelectedUser: (student: Student) => void;
    selectedUser: Student|undefined;
}

const UserList = ({setSelectedUser, selectedUser}:props) => {
    const dispatch = useAppDispatch();
    const { user } = useAuth();
    const result = useAppSelector(state => state.student.items.result);

    const fetchChatHistory=(student:Student)=>{
        setSelectedUser(student);
        dispatch(fetchChat(`${student?.user_id}${user?.id}`));
    }

    return (
        <>
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p:0, borderRadius:2 }} >
                {result.data.map((student) => {
                const labelId = `checkbox-list-secondary-label-${student.id}`;
                const isSelected = selectedUser?.id === student.id;
                return (
                    <ListItem
                    key={student.id}
                    disablePadding
                    sx={{borderRadius:2, }}
                    >
                        <ListItemButton onClick={() => fetchChatHistory(student)} sx={{borderRadius:2, bgcolor: isSelected ? '#cabae4' : '', // Apply conditional background color
                                '&:hover': {
                                    bgcolor: isSelected ? '#5e35b1' : '#cabae4' // Optional: Hover effect
                                }}}>
                            <ListItemAvatar>
                            <Avatar
                                alt={`Avatar n°${student.id + 1}`}
                                src={`${student.avatar_url ? student.avatar_url:"/images/users/user.svg"}`}
                                sx={{ backgroundColor: '#8261c2' }}
                            />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={`${student.name}`} />
                        </ListItemButton>
                    </ListItem>
                );
                })}
            </List>
        </>
    );
};

export default UserList;
