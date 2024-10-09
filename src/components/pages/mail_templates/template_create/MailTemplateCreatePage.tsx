import { FormEvent, useEffect } from 'react';
import { postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setError } from '@/store/features/mail_template';

import { Button } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import MailTemplateForm from './sections/MailTemplateForm';

const MailTemplateCreatePage = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.mail_template.item.form);

    useEffect(() => {
        dispatch(clearCurrentItem());
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await postRequest(`/v0/mail_templates/create`, currentItem);
        if (res.status == 200) {
            dispatch(clearCurrentItem());
        }

        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'teacher', 'student']}>
                <MainLayout>
                    <TitleBar href='/mail/templates'>新規テンプレート作成</TitleBar>

                    <MainPannel>
                        <form className='w-full flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                            <MailTemplateForm />

                            {/* ************************************************************************ */}
                            <div className='mt-[16px]'>
                                <Button type='submit' variant='contained' color='secondary'>
                                    作成する
                                </Button>
                            </div>
                        </form>
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default MailTemplateCreatePage;
