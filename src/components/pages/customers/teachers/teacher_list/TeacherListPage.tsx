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
// import TeacherList from './sections/TeacherList';
import { fetchUsers } from '@/store/features/user';
// import Filter from './sections/Filter';
// import CustomerTable from './sections/CustomerTable';
// import TablePagination from './sections/TablePagination';

const CustomerListPage = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.teacher.items.filter);

    useEffect(() => {
        dispatch(fetchUsers(filter));
    }, [filter]);

    return (
        <>
            <TitleBar>顧客一覧</TitleBar>
            <MainPannel>
                {/* <TeacherList/> */}
                <div>
                    this is teacherlist page
                </div>
                {/* <Filter />
                <CustomerTable search_url={search_parmam_url} />
                <TablePagination /> */}

            </MainPannel>
        </>
    );
};

export default CustomerListPage;
