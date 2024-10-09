'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const CustomerListPage = dynamic(() => import('@/components/pages/customer/customer_list/CustomerListPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <CustomerListPage />;
};

export default Page;
