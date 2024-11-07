'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const TestCreatePage = dynamic(() => import('@/components/pages/customers/teachers/test/create_test/OnlineTestCreatePage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <TestCreatePage />;
};

export default Page;