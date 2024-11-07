'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const DashboardPage = dynamic(() => import('@/components/pages/dashboard/DashboardPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <DashboardPage />;
};

export default Page;
