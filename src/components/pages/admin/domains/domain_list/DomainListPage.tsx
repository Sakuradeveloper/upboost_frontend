import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDomains } from '@/store/features/domain';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import Filter from './sections/Filter';
import DomainTable from './sections/DomainTable';
import TablePagination from './sections/TablePagination';

const DomainListPage = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.domain.items.filter);
    const result = useAppSelector(state => state.domain.items.result);

    useEffect(() => {
        dispatch(fetchDomains(filter));
    }, [filter]);

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin']}>
                <MainLayout>
                    <TitleBar>ドメイン一覧</TitleBar>

                    <MainPannel>
                        <Filter />
                        <DomainTable />
                        <TablePagination />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default DomainListPage;
