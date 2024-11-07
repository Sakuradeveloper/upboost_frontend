'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const TeacherlistPage = dynamic(() => import('@/components/pages/customers/teachers/teacher_list/TeacherListPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <TeacherlistPage />;
};

export default Page;
