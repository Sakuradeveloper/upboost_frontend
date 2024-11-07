'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const SubjectListPage = dynamic(() => import('@/components/pages/admin/subjects/subject_list/SubjectListPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <SubjectListPage />;
};

export default Page;
