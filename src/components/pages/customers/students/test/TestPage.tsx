import { useEffect, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
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
import { fetchProgress } from '@/store/features/progress';
// import ProgressTable from './sections/ProgressTable';
import { fetchSubjects } from '@/store/features/subject';
import TestTakingPage from './sections/TestTakingPage';
import { fetchTest, userChapter, fetchProblem } from '@/store/features/online_test';
// import Filter from './sections/Filter';
// import CustomerTable from './sections/CustomerTable';
// import TablePagination from './sections/TablePagination';

const OnlineTestCreatePage = () => {
    const { user } = useAuth();
    const searchParams = useSearchParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
            // dispatch(fetchProgress(teacher, student));
        const chapterId = searchParams.get('chapter_id');
        console.log(chapterId, "chapterID")
        const userChapter:userChapter = {
            user: user?.id,
            chapter: chapterId,
        }
        dispatch(fetchProblem(userChapter))
    }, [dispatch, searchParams, user]);
    
    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'teacher', 'student']}>
                <MainLayout>
                    <TitleBar>レッスンの進捗状況</TitleBar>
                    <MainPannel>
                        <TestTakingPage/>
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default OnlineTestCreatePage;
