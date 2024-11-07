'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const ChaptersListPage = dynamic(() => import('@/components/pages/admin/chapters/chapter_list/ChapterListPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <ChaptersListPage />;
};

export default Page;