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
import { Student, Teacher } from '@/interfaces';
// import Student from '@/store/features/student';

interface props{
    setSelectedUser: (student: Teacher) => void;
    selectedUser: Teacher|undefined;
}

const UserList = ({setSelectedUser, selectedUser}:props) => {
    const dispatch = useAppDispatch();
    const { user } = useAuth();
    const result = useAppSelector(state => state.teacher.items.result);

    const fetchChatHistory=(teacher:Teacher)=>{
        setSelectedUser(teacher);
        dispatch(fetchChat(`${user?.id}${teacher?.user_id}`));
    }

    return (
        <>
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p:0, borderRadius:2 }} >
                {result.data?.map((teacher) => {
                const labelId = `checkbox-list-secondary-label-${teacher.id}`;
                const isSelected = selectedUser?.id === teacher.id;
                return (
                    <ListItem
                    key={teacher.id}
                    disablePadding
                    sx={{borderRadius:2, }}
                    >
                        <ListItemButton onClick={() => fetchChatHistory(teacher)} sx={{borderRadius:2, bgcolor: isSelected ? '#cabae4' : '', '&:hover': {
                                    bgcolor: isSelected ? '#5e35b1' : '#cabae4' // Optional: Hover effect
                                }}}>
                            <ListItemAvatar>
                            <Avatar
                                alt={`Avatar n°${teacher.id + 1}`}
                                src={teacher.avatar_url? teacher.avatar_url:`/images/users/user.svg`}
                                sx={{ backgroundColor: '#8261c2' }}
                            />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={`${teacher.name}`} />
                        </ListItemButton>
                    </ListItem>
                );
                })}
            </List>
        </>
    );
};

export default UserList;
