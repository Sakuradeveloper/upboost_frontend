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
import Filter from './sections/Filter';
import CustomerTable from './sections/CustomerTable';
import TablePagination from './sections/TablePagination';

const CustomerListPage = () => {
    const router = useRouter();
    const params = useSearchParams();
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.customer.items.filter);
    const result = useAppSelector(state => state.customer.items.result);

    const search_parmam_url = useMemo(() => {
        const new_params = new URLSearchParams();

        for (let key in filter) {
            if (filter[key] == 0 || filter[key] == '') continue;
            if (key == 'page' && filter[key] == 1) continue;
            if (key == 'pageSize' && filter[key] == 10) continue;
            if (key == 'order_by' && filter[key] == 'id') continue;
            if (key == 'enable') continue;
            new_params.append(key, filter[key] as string);
        }

        return new_params.toString();
    }, [filter]);

    useEffect(() => {
        dispatch(fetchStatusData());
        dispatch(fetchPropertyData());
    }, [dispatch]);

    useEffect(() => {
        let temp_filter = {
            keyword: params.get('keyword') || '',
            order_by: params.get('order_by') || 'id',
            manager: parseInt(params.get('manager') || '0'),
            status: parseInt(params.get('status') || '0'),
            property: parseInt(params.get('property') || '0'),
            page: parseInt(params.get('page') || '1'),
            pageSize: parseInt(params.get('pageSize') || '10')
        };

        dispatch(setFilterValue(temp_filter));
        dispatch(fetchCustomers(temp_filter));
    }, [params, dispatch]);

    useEffect(() => {
        router.push(`/customers?${search_parmam_url}`);
    }, [search_parmam_url, router]);

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'student']}>
                <MainLayout>
                    <TitleBar>顧客一覧</TitleBar>

                    <MainPannel>
                        <Filter />
                        <CustomerTable search_url={search_parmam_url} />
                        <TablePagination />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default CustomerListPage;
