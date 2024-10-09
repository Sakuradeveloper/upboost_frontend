'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const SubjectListPage = dynamic(() => import('@/components/pages/admin/lecture/LecturePage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <SubjectListPage />;
};

export default Page;
