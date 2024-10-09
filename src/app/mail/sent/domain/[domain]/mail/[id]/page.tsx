'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const MailSentInfoPage = dynamic(() => import('@/components/pages/mail/sent_info/MailSentInfoPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <MailSentInfoPage />;
};

export default Page;
