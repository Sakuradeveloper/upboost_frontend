'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const MailNewSendPage = dynamic(() => import('@/components/pages/mail/new_send/MailNewSendPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <MailNewSendPage />;
};

export default Page;
