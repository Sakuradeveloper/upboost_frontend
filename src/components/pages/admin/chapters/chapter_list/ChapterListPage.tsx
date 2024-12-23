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
import { fetchSubjects } from '@/store/features/subject';

const ChapterListPage = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.customer.item.form);

    useEffect(() => {
        dispatch(clearCurrentItem());
        dispatch(fetchSubjects());
    }, [dispatch]);

    

    return (
        <>
            <TitleBar href='/admin/lecture'>教科書編集</TitleBar>
            <MainPannel>
                <ChapterList />
            </MainPannel>
        </>
    );
};

export default ChapterListPage;
