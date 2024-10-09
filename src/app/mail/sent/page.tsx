'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const MailSentDomainsPage = dynamic(() => import('@/components/pages/mail/sent_domains/MailSentDomainsPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <MailSentDomainsPage />;
};

export default Page;
