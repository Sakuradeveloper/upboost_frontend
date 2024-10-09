'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const MailInboxPage = dynamic(() => import('@/components/pages/mail/inbox/MailInboxPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <MailInboxPage />;
};

export default Page;
