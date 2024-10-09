'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const UserListPage = dynamic(() => import('@/components/pages/admin/users/user_list/UserListPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <UserListPage />;
};

export default Page;
