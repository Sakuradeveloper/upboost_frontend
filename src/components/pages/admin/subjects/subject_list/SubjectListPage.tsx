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
import SubjectList from './sections/SubjectList';
import { fetchSubjects } from '@/store/features/subject';

const SubjectListPage = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.customer.item.form);

    useEffect(() => {
        dispatch(clearCurrentItem());
        dispatch(fetchSubjects());
    }, [dispatch]);


    return (
        <>
            <TitleBar href='/admin/subjects'>教科書管理</TitleBar>
            <MainPannel>
                <SubjectList />
            </MainPannel>
        </>
    );
};

export default SubjectListPage;
