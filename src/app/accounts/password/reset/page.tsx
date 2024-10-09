'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const PasswordResetPage = dynamic(() => import('@/components/pages/accounts/reset/PasswordResetPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <PasswordResetPage />;
};

export default Page;
