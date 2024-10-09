'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const UserList = dynamic(() => import('@/components/pages/customers/teachers/users/user_list/UserListPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <UserList />;
};

export default Page;