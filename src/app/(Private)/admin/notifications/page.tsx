'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const NotificationPage = dynamic(() => import('@/components/pages/admin/notificatons/NotificationAdminPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <NotificationPage />;
};

export default Page;