import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMailTemplates } from '@/store/features/mail_template';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import Filter from './sections/Filter';
import MailTemplateTable from './sections/MailTemplateTable';
import TablePagination from './sections/TablePagination';

const MailTemplateListPage = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.mail_template.items.filter);
    const result = useAppSelector(state => state.mail_template.items.result);

    useEffect(() => {
        dispatch(fetchMailTemplates(filter));
    }, [filter]);

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'teacher', 'student']}>
                <MainLayout>
                    <TitleBar>テンプレート一覧</TitleBar>

                    <MainPannel>
                        <Filter />
                        <MailTemplateTable />
                        <TablePagination />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default MailTemplateListPage;
