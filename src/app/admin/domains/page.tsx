'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const DomainListPage = dynamic(() => import('@/components/pages/admin/domains/domain_list/DomainListPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <DomainListPage />;
};

export default Page;
