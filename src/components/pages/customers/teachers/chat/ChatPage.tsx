import { useEffect, useMemo } from 'react';
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
import { Box } from '@mui/material';
// import Filter from './sections/Filter';
// import CustomerTable from './sections/CustomerTable';
// import TablePagination from './sections/TablePagination';
import ChatConnect from './sections/ChatConnect';
import ChatRoom from './sections/ChatRoom';
import { fetchStudent } from '@/store/features/student';
import ChatList from './sections/ChatList';
import TestRoom from './sections/TestRoom';

const ChatPage = () => {
    const dispatch = useAppDispatch();
    const { user } = useAuth();
    useEffect(() => {
        if(user?.id){
            dispatch(fetchStudent(user?.id))
        }
    }, [user?.id, dispatch ]);

    return (
        <AuthLayout>
            <PermissionLayout permission={['teacher', 'owner']} role={['teacher', 'admin']}>
                <MainLayout>
                    <TitleBar>
                        <Box className='w-full'>
                        チャット
                        </Box>
                    </TitleBar>
                    <MainPannel>
                        {/* <ChatConnect/> */}
                        {/* <ChatRoom/> */}
                        <ChatList/>
                        {/* <TestRoom/> */}
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default ChatPage;
