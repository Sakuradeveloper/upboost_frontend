import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUsers } from '@/store/features/user';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import Filter from './sections/Filter';
import StudentTable from './sections/StudentTable';
import TablePagination from './sections/TablePagination';
import { fetchStudent } from '@/store/features/student';
import { useAuth } from '@/contexts/AuthContext';

const UserListPage = () => {
    const dispatch = useAppDispatch();

    const { user} = useAuth();
    useEffect(() => {
        if(user?.id){
            dispatch(fetchStudent(user?.id))
        }
    }, [user?.id, dispatch ]);

    return (
        <>
            <TitleBar>学生管理</TitleBar>

            <MainPannel>
                {/* <Filter /> */}
                <StudentTable />
                {/* <TablePagination /> */}
                {/* <>userlist</> */}
            </MainPannel>
        </>
    );
};

export default UserListPage;
