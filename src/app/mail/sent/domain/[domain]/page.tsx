'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const MailSentPage = dynamic(() => import('@/components/pages/mail/sent/MailSentPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <MailSentPage />;
};

export default Page;
