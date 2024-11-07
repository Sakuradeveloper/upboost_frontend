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
import Test from './sections/Test';
import { fetchTest } from '@/store/features/online_test';
// import Filter from './sections/Filter';
// import CustomerTable from './sections/CustomerTable';
// import TablePagination from './sections/TablePagination';

const OnlineTestCreatePage = () => {
    const { user } = useAuth();
    const searchParams = useSearchParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
            // dispatch(fetchProgress(teacher, student));
        dispatch(fetchTest(12))
        // dispatch(fetchSubjects())
    }, []);
    
    return (
        <>
            <TitleBar>レッスンの進捗状況</TitleBar>
            <MainPannel>
                <Test/>
            </MainPannel>
        </>
    );
};

export default OnlineTestCreatePage;
