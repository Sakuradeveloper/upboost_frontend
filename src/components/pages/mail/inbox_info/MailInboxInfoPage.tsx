import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { IMail } from '@/interfaces';
import { postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMails, reset, setCurrentItemValue } from '@/store/features/mail';
import { fetchMailTemplates } from '@/store/features/mail_template';
import { fetchDomainData } from '@/store/features/shared_data';

import { Avatar, Badge, Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MailItem from './components/MailItem';
import MailSendForm from '../new_send/components/MailSendForm';

const MailInboxPage = () => {
    const { domain, id } = useParams();
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.mail.items.filter);
    const result = useAppSelector(state => state.mail.items.result);

    useEffect(() => {
        dispatch(fetchDomainData());
        dispatch(
            fetchMailTemplates({
                page: 1,
                pageSize: 99999
            })
        );
        return () => {
            dispatch(reset());
        };
    }, []);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const fetchData = () => {
        dispatch(fetchMails({ domain: domain.toString().replace(/%40/g, '@'), id: parseInt(`${id}`) }));
    };

    const handleReplyClick = () => {
        dispatch(
            setCurrentItemValue({
                recipients: [result.customer],
                open: true
            })
        );
    };

    const handleMakeAsReadClick = async (item: IMail) => {
        if (item.read) {
            return;
        }

        const res = await postRequest(`/v0/mails/inbox/${item.id}/read`, null);
        if (res.status == 200) {
            fetchData();
        }
    };

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'teacher', 'student']}>
                <MainLayout>
                    <TitleBar>
                        <div className='w-full flex justify-between'>
                            <Link
                                className='w-full flex items-baseline gap-[20px]'
                                href={`/mail/inbox/domain/${domain}`}
                            >
                                <Avatar sx={{ bgcolor: deepOrange[500], color: 'white' }}>
                                    {result.customer?.name?.charAt(0)}
                                </Avatar>
                                <h2 className=''>{result.customer?.name || ''}</h2>
                                <span>-</span>
                                <span>{result.total} 件</span>
                            </Link>

                            <Button size='small' variant='contained' color='secondary' onClick={handleReplyClick}>
                                <span className='whitespace-nowrap'>返信</span>
                            </Button>
                        </div>
                    </TitleBar>

                    <div className='w-full flex flex-col gap-[16px]'>
                        {result.data.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleMakeAsReadClick(item)}
                                className='w-full px-[16px] sm:px-[24px] py-[0px] cursor-pointer  bg-white rounded-lg'
                            >
                                <Badge
                                    className='w-full'
                                    color='secondary'
                                    badgeContent={item.read ? 0 : '未読'}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                >
                                    <MailItem item={item} />
                                </Badge>
                            </div>
                        ))}
                        <div className='w-full max-w-[200px] mx-auto'>
                            <Button
                                size='small'
                                fullWidth
                                variant='contained'
                                color='secondary'
                                className='max-w-[200px]'
                                onClick={handleReplyClick}
                            >
                                <span className='whitespace-nowrap'>返信</span>
                            </Button>
                        </div>
                    </div>

                    <MailSendForm onReload={fetchData} />
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default MailInboxPage;
