'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const Application = dynamic(() => import('@/components/pages/customers/students/application/ApplicationFormPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <Application />;
};

export default Page;