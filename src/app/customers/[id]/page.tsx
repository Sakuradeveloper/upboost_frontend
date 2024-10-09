'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const CustomerEditPage = dynamic(() => import('@/components/pages/customer/customer_info/CustomerEditPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <CustomerEditPage />;
};

export default Page;
