import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { deleteRequest, patchRequest } from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, clearError, fetchUser, setError } from '@/store/features/user';

import { Button } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import UserForm from '@/components/pages/admin/users/user_create/sections/UserForm';
import ConfirmDialog from './components/ConfirmDialog';

const UserEditPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const { setPending } = useAuth();
    const dispatch = useAppDispatch();

    const [currentDialog, setCurrentDialog] = useState('');
    const currentItem = useAppSelector(state => state.user.item.form);

    useEffect(() => {
        dispatch(clearCurrentItem());
        dispatch(fetchUser(parseInt(`${id}`)));
    }, [id]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setPending!(true);

        const res = await patchRequest(`/v0/admin/users/${currentItem.id}`, currentItem);
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

        const res = await deleteRequest(`/v0/admin/users/${currentItem.id}`, null);
        if (res.status == 200) {
            router.push('/admin/users');
        }

        setPending!(false);
    };

    return (
        <>
            <TitleBar href='/admin/users'>担当情報</TitleBar>

            <MainPannel>
                <form className='w-full flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                    <UserForm />

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
        </>
    );
};

export default UserEditPage;
