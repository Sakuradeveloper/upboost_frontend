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
import ProgressTable from './sections/ProgressTable';
import { fetchSubjects } from '@/store/features/subject';
// import Filter from './sections/Filter';
// import CustomerTable from './sections/CustomerTable';
// import TablePagination from './sections/TablePagination';

const ProgressPage = () => {
    const searchParams = useSearchParams();
    const teacher = searchParams.get('teacher');
    const student = searchParams.get('student');

    const dispatch = useAppDispatch();

    const arg = useMemo(()=>{
        return {teacher, student}
    },[teacher, student])

    useEffect(() => {
            // dispatch(fetchProgress(teacher, student));
        dispatch(fetchProgress(arg))
        dispatch(fetchSubjects())
    }, [dispatch, arg]);
    
    return (
        <>
            <TitleBar>レッスンの進捗状況</TitleBar>
            <MainPannel>
                <ProgressTable teacherId={teacher} studentId={student} />
                {/* <Filter />
                <CustomerTable search_url={search_parmam_url} />
                <TablePagination /> */}

            </MainPannel>
        </>
    );
};

export default ProgressPage;
