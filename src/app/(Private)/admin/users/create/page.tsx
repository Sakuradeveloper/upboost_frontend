'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const UserCreatePage = dynamic(() => import('@/components/pages/admin/users/user_create/UserCreatePage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <UserCreatePage />;
};

export default Page;
