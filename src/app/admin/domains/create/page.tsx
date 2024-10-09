'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const DomainCreatePage = dynamic(() => import('@/components/pages/admin/domains/domain_create/DomainCreatePage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <DomainCreatePage />;
};

export default Page;
