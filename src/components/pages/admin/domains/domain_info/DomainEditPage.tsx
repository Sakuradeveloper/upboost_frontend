import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { deleteRequest, patchRequest } from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, clearError, fetchDomain, setError } from '@/store/features/domain';

import { Button } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import DomainForm from '@/components/pages/admin/domains/domain_create/sections/DomainForm';
import ConfirmDialog from './components/ConfirmDialog';

const DomainEditPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const { setPending } = useAuth();
    const dispatch = useAppDispatch();

    const [currentDialog, setCurrentDialog] = useState('');
    const currentItem = useAppSelector(state => state.domain.item.form);

    useEffect(() => {
        dispatch(clearCurrentItem());
        dispatch(fetchDomain(parseInt(`${id}`)));
    }, [id]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setPending!(true);

        const res = await patchRequest(`/v0/admin/domains/${currentItem.id}`, currentItem);
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

        const res = await deleteRequest(`/v0/admin/domains/${currentItem.id}`, null);
        if (res.status == 200) {
            router.push('/admin/domains');
        }

        setPending!(false);
    };

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin']}>
                <MainLayout>
                    <TitleBar href='/admin/domains'>ドメイン情報</TitleBar>

                    <MainPannel>
                        <form className='w-full flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                            <DomainForm />

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
                    </MainPannel>

                    <ConfirmDialog
                        open={currentDialog === 'delete'}
                        handleClose={() => setCurrentDialog('')}
                        handleConfirm={handleDelete}
                    />
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default DomainEditPage;
