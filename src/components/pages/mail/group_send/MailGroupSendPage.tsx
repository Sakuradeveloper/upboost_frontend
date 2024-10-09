import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchStatusData, fetchPropertyData, fetchDomainData } from '@/store/features/shared_data';
import { fetchMailTemplates } from '@/store/features/mail_template';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import StatusTable from './sections/StatusTable';
import MailSendForm from './components/MailSendForm';
import PropertyTable from './sections/PropertyTable';

const MailGroupSendPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchStatusData());
        dispatch(fetchPropertyData());
        dispatch(fetchDomainData());
        dispatch(
            fetchMailTemplates({
                page: 1,
                pageSize: 99999
            })
        );
    }, []);

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'student', 'student']}>
                <MainLayout>
                    <TitleBar>配信先選択</TitleBar>

                    <MainPannel>
                        <div className='w-full flex flex-col xl:flex-row gap-[24px] xl:gap-[40px]'>
                            <PropertyTable />
                            <StatusTable />
                        </div>
                        <MailSendForm />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default MailGroupSendPage;
