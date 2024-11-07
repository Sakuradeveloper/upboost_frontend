'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const Progress = dynamic(() => import('@/components/pages/customers/students/progress/progressPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <Progress />;
};

export default Page;