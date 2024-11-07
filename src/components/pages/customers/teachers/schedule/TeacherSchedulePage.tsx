import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCustomers, reset, setFilterValue } from '@/store/features/customer';
import { fetchPropertyData, fetchStatusData } from '@/store/features/shared_data';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import { fetchUsers } from '@/store/features/user';
import Schedule from './sections/Schedule';
import { fetchSchedules } from '@/store/features/schedule';
import { useAuth } from '@/contexts/AuthContext';
import ScheduleTitle from './components/ScheduleTitle';
import { Box } from '@mui/material';
// import Filter from './sections/Filter';
// import CustomerTable from './sections/CustomerTable';
// import TablePagination from './sections/TablePagination';

const CustomerListPage = () => {
    const dispatch = useAppDispatch();
    const { user } = useAuth();
    const filter = useAppSelector(state => state.teacher.items.filter);

    // useEffect(()=>{
    //     if(user?.id)
    //       dispatch(fetchSchedules(user?.id));
    //   },[])

    return (
        <>
            <TitleBar>
                <Box className='w-full'>
                    <ScheduleTitle/>
                </Box>
            </TitleBar>
            <MainPannel>
                <Schedule/>
            </MainPannel>
        </>
    );
};

export default CustomerListPage;
