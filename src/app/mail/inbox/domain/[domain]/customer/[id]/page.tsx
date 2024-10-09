'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const MailInboxInfoPage = dynamic(() => import('@/components/pages/mail/inbox_info/MailInboxInfoPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <MailInboxInfoPage />;
};

export default Page;
