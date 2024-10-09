'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const DomainEditPage = dynamic(() => import('@/components/pages/admin/domains/domain_info/DomainEditPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <DomainEditPage />;
};

export default Page;
