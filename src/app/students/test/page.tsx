'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const Question = dynamic(() => import('@/components/pages/customers/students/test/TestPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <Question />;
};

export default Page;