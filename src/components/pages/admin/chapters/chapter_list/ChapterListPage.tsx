import { FormEvent, useEffect } from 'react';
import { postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setError } from '@/store/features/customer';

import { Button } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import ChapterList from './sections/ChapterList';
import { fetchCaptures } from '@/store/features/subject';

const ChapterListPage = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.customer.item.form);

    useEffect(() => {
        dispatch(clearCurrentItem());
        dispatch(fetchCaptures());
    }, [dispatch]);

    

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin']}>
                <MainLayout>
                    <TitleBar href='/admin/lecture'>教科書編集</TitleBar>
                    <MainPannel>
                        <ChapterList />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default ChapterListPage;
