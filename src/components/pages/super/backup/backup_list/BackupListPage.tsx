import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBackupList, reset } from '@/store/features/backup';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import Filter from './sections/Filter';
import BackupTable from './sections/BackupTable';
import TablePagination from './sections/TablePagination';

const CustomerListPage = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.backup.items.filter);
    const result = useAppSelector(state => state.backup.items.result);

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, []);

    useEffect(() => {
        dispatch(fetchBackupList(filter));
    }, [filter]);

    return (
        <>
            <TitleBar>バックアップ一覧</TitleBar>

            <MainPannel>
                <Filter />
                <BackupTable />
                <TablePagination />
            </MainPannel>
        </>
    );
};

export default CustomerListPage;
