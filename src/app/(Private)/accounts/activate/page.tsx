'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const AccountActivatePage = dynamic(() => import('@/components/pages/accounts/activate/AccountActivatePage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <AccountActivatePage />;
};

export default Page;
