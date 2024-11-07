'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const StudentSchedulePage = dynamic(() => import('@/components/pages/customers/students/schedule/StudentSchedulePage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <StudentSchedulePage />;
};

export default Page;