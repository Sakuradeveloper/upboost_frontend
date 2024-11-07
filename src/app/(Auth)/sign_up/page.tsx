'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const SignUpPage = dynamic(() => import('@/components/pages/accounts/sign_up/SignUpPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <SignUpPage />;
};

export default Page;