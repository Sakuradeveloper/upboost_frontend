'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const UserEditPage = dynamic(() => import('@/components/pages/admin/users/user_info/UserEditPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <UserEditPage />;
};

export default Page;
