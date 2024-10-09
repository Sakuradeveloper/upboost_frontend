'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const MailInboxDomainsPage = dynamic(() => import('@/components/pages/mail/inbox_domains/MailInboxDomainsPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <MailInboxDomainsPage />;
};

export default Page;
