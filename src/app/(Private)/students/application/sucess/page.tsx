'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const Sucess = dynamic(() => import('@/components/pages/customers/students/application/sections/SucessPage'), {
    // const Application = dynamic(() => import('@/components/pages/customers/students/application/ApplicationFormPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <Sucess />;
};

export default Page;