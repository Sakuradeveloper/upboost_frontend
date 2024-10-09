import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { IMail } from '@/interfaces';
import { postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSentMail, reset, setCurrentItemValue } from '@/store/features/mail';
import { fetchMailTemplates } from '@/store/features/mail_template';

import { Avatar, AvatarGroup, Badge } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MailItem from '../inbox_info/components/MailItem';

const MailSentInfoPage = () => {
    const { id, domain } = useParams();
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.mail.items.filter);
    const result = useAppSelector(state => state.mail.items.result);

    useEffect(() => {
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
        dispatch(fetchSentMail(parseInt(`${id}`)));
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
                    <TitleBar href={`/mail/sent/domain/${domain}`}>
                        <div className='w-full flex justify-between'>
                            {result.data.length > 0 && (
                                <div className='w-full flex items-baseline gap-[20px]'>
                                    <AvatarGroup max={3}>
                                        {result.data[0].customers.map(customer => (
                                            <Avatar sx={{ bgcolor: deepOrange[500], color: 'white' }} key={customer.id}>
                                                {customer.name?.charAt(0)}
                                            </Avatar>
                                        ))}
                                    </AvatarGroup>
                                    <h2 className=' line-clamp-1'>
                                        {result.data[0].customers.map(customer => customer.name).join(', ')}
                                    </h2>
                                </div>
                            )}
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
                    </div>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default MailSentInfoPage;
