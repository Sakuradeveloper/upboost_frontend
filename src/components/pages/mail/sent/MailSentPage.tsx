import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSentMails, reset, setFilterValue } from '@/store/features/mail';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import InboxTable from './sections/InboxTable';
import TablePagination from './sections/TablePagination';

const MailSentPage = () => {
    const { domain } = useParams();
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.mail.items.filter);
    const result = useAppSelector(state => state.mail.items.result);

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(setFilterValue({ domain: domain.toString().replace(/%40/g, '@') }));
    }, [domain, dispatch]);

    useEffect(() => {
        dispatch(fetchSentMails(filter));
    }, [filter, dispatch]);

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'teacher', 'student']}>
                <MainLayout>
                    <TitleBar href='/mail/sent'>
                        送信トレイ
                        <span className='text-sm font-normal ml-2 line-clamp-1'>{`<${filter.domain}>`}</span>
                    </TitleBar>

                    <MainPannel>
                        <InboxTable />
                        <TablePagination />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default MailSentPage;
