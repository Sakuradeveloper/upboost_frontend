'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const ProfilePage = dynamic(() => import('@/components/pages/accounts/profile/ProfilePage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <ProfilePage />;
};

export default Page;
