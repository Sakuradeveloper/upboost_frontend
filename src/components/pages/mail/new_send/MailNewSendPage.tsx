import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCustomers } from '@/store/features/customer';
import { fetchStatusData, fetchPropertyData, fetchDomainData } from '@/store/features/shared_data';
import { fetchMailTemplates } from '@/store/features/mail_template';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import Filter from './sections/Filter';
import CustomerTable from './sections/CustomerTable';
import TablePagination from './sections/TablePagination';
import MailSendForm from './components/MailSendForm';

const MailNewSendPage = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.customer.items.filter);

    useEffect(() => {
        dispatch(fetchStatusData());
        dispatch(fetchPropertyData());
        dispatch(fetchDomainData());
        dispatch(
            fetchMailTemplates({
                page: 1,
                pageSize: 99999
            })
        );
    }, []);

    useEffect(() => {
        dispatch(fetchCustomers(filter));
    }, [filter]);

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'teacher', 'student']}>
                <MainLayout>
                    <TitleBar>配信先選択</TitleBar>

                    <MainPannel>
                        <Filter />
                        <CustomerTable />
                        <TablePagination />

                        <MailSendForm onReload={() => fetchCustomers(filter)} />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default MailNewSendPage;
