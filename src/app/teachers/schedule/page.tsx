'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const TeacherSchedulePage = dynamic(() => import('@/components/pages/customers/teachers/schedule/TeacherSchedulePage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <TeacherSchedulePage />;
};

export default Page;