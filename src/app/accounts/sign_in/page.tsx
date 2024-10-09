'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const SignInPage = dynamic(() => import('@/components/pages/accounts/sign_in/SignInPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <SignInPage />;
};

export default Page;
