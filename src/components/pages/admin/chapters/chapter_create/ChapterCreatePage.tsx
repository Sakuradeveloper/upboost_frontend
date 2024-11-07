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
import ChapterForm from './sections/ChapterForm';

const ChapterCreatePage = () => {
    const dispatch = useAppDispatch();

    // const currentItem = useAppSelector(state => state.customer.item.form);

    // useEffect(() => {
    //     dispatch(clearCurrentItem());
    // }, []);

    

    return (
        <>
            <TitleBar href='/customers'>教科書編集</TitleBar>

            <MainPannel>
                    <ChapterForm />
            </MainPannel>
        </>
    );
};

export default ChapterCreatePage;
