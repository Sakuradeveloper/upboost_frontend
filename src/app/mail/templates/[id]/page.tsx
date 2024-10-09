'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const CreateTemplatePage = dynamic(
    () => import('@/components/pages/mail_templates/template_info/MailTemplateEditPage'),
    {
        loading: () => <Loading />
    }
);

const Page = () => {
    return <CreateTemplatePage />;
};

export default Page;
