'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const ApplocationTrialPage = dynamic(() => import('@/components/pages/customers/teachers/applications/trial/ApplicationTrialPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <ApplocationTrialPage />;
};

export default Page;