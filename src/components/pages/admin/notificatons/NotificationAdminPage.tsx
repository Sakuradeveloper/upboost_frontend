import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBackupList, reset } from '@/store/features/backup';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import NotificationTableAdmin from './sections/NotifacationTableAdmin';
import { useAuth } from '@/contexts/AuthContext';
import { fetchNotification, fetchNotificationTable } from '@/store/features/notification';

const NotificationAdminPage = () => {
    const dispatch = useAppDispatch();

    const {user} = useAuth();
    const filter = useAppSelector(state => state.backup.items.filter);
    const result = useAppSelector(state => state.notification.items.result);

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
        <>
            <TitleBar>無料試聴一覧</TitleBar>

            <MainPannel>
                <NotificationTableAdmin/>
                {/* <Filter />
                <BackupTable />
                <TablePagination /> */}
            </MainPannel>
        </>
    );
};

export default NotificationAdminPage;
