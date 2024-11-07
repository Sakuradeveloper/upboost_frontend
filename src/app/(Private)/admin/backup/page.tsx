'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const BackupListPage = dynamic(() => import('@/components/pages/super/backup/backup_list/BackupListPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <BackupListPage />;
};

export default Page;
