'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const TrialFormPage = dynamic(() => import('@/components/pages/trial/TrialFormPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <TrialFormPage />;
};

export default Page;