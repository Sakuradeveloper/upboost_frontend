import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBackupList, reset } from '@/store/features/backup';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import NotificationTable from './sections/NotificationTable';
import { useAuth } from '@/contexts/AuthContext';
import { fetchNotification, fetchNotificationTable } from '@/store/features/notification';
import { Box } from '@mui/material';

const NotificationPage = () => {
    // const dispatch = useAppDispatch();

    // const {user} = useAuth();
    // const filter = useAppSelector(state => state.backup.items.filter);
    // const result = useAppSelector(state => state.notification.items.result);

    // useEffect(() => {
    //     return () => {
    //         dispatch(reset());
    //     };
    // }, []);

    // useEffect(() => {
    //     dispatch(fetchBackupList(filter));
    // }, [filter]);
    // useEffect(()=>{
    //     if(user?.id)
    //         dispatch(updateReadState(user?.id))
    // },[dispatch, user?.id])

    return (
        <Box>
            <TitleBar>無料試聴一覧</TitleBar>

            <MainPannel>
                <NotificationTable/>
                {/* <Filter />
                <BackupTable />
                <TablePagination /> */}
            </MainPannel>
        </Box>
    );
};

export default NotificationPage;
