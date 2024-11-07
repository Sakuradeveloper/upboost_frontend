'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const TestPage = dynamic(() => import('@/components/pages/customers/teachers/test/OnlineTestPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <TestPage />;
};

export default Page;