'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const CustomerCreatePage = dynamic(() => import('@/components/pages/customers/customer_create/CustomerCreatePage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <CustomerCreatePage />;
};

export default Page;
