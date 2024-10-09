import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { deleteRequest, patchRequest } from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, fetchMailTemplate, setError, clearError } from '@/store/features/mail_template';

import { Button } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import MailTemplateForm from '../template_create/sections/MailTemplateForm';
import ConfirmDialog from './components/ConfirmDialog';

const MailTemplateEditPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const { setPending } = useAuth();
    const dispatch = useAppDispatch();

    const [currentDialog, setCurrentDialog] = useState('');
    const currentItem = useAppSelector(state => state.mail_template.item.form);

    useEffect(() => {
        dispatch(clearCurrentItem());
        dispatch(fetchMailTemplate(parseInt(`${id}`)));
    }, [id]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setPending!(true);

        const res = await patchRequest(`/v0/mail_templates/${currentItem.id}`, currentItem);
        if (res.status == 200) {
            dispatch(clearError());
        }

        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }

        setPending!(false);
    };

    const handleDelete = async () => {
        setPending!(true);

        const res = await deleteRequest(`/v0/mail_templates/${currentItem.id}`, null);
        if (res.status == 200) {
            router.push('/mail/templates');
        }

        setPending!(false);
    };

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'teacher', 'student']}>
                <MainLayout>
                    <TitleBar href='/mail/templates'>テンプレート情報</TitleBar>

                    <MainPannel>
                        <form className='w-full flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                            <MailTemplateForm />

                            {/* ************************************************************************ */}
                            <div className='mt-[16px] w-full flex items-center gap-[16px]'>
                                <Button type='submit' variant='contained' color='secondary'>
                                    保存する
                                </Button>

                                <Button
                                    type='button'
                                    variant='contained'
                                    color='inherit'
                                    onClick={() => setCurrentDialog('delete')}
                                >
                                    削除する
                                </Button>
                            </div>
                        </form>

                        <ConfirmDialog
                            open={currentDialog === 'delete'}
                            handleClose={() => setCurrentDialog('')}
                            handleConfirm={handleDelete}
                        />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default MailTemplateEditPage;
