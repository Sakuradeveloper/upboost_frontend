import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { clearCurrentItem, clearError, fetchUser, setError } from '@/store/features/user';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import { clearCurrentItem, fetchSubject } from '@/store/features/subject';
import ChapterDetail from './sections/ChapterDetail';
// import ConfirmDialog from './components/ConfirmDialog';

const UserEditPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const subjectId = Array.isArray(id) ? id[0] : id;

    useEffect(() => {
        dispatch(clearCurrentItem());
        dispatch(fetchSubject(parseInt(`${id}`)));
    }, [dispatch, id]);

    return (
        <>
            <TitleBar href='/admin/chapters'>教科書管理</TitleBar>

            <MainPannel>
                <ChapterDetail id={subjectId}/>
            </MainPannel>
        </>
    );
};

export default UserEditPage;
