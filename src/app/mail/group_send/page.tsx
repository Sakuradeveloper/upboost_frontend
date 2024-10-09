'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const MailGroupSendPage = dynamic(() => import('@/components/pages/mail/group_send/MailGroupSendPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <MailGroupSendPage />;
};

export default Page;
