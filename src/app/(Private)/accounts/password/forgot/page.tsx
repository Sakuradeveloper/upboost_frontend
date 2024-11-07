'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const PasswordForgotPage = dynamic(() => import('@/components/pages/accounts/forgot/PasswordForgotPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <PasswordForgotPage />;
};

export default Page;
