'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const MailTemplateListPage = dynamic(
    () => import('@/components/pages/mail_templates/template_list/MailTemplateListPage'),
    {
        loading: () => <Loading />
    }
);

const Page = () => {
    return <MailTemplateListPage />;
};

export default Page;
