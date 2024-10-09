'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const LectureCreatePage = dynamic(() => import('@/components/pages/admin/chapters/chapter_create/ChapterCreatePage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <LectureCreatePage />;
};

export default Page;