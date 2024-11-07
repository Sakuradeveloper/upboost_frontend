import { FormEvent, useEffect } from 'react';
import { postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setError } from '@/store/features/user';

import { Button } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import UserForm from './sections/UserForm';

const UserCreatePage = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.user.item.form);

    useEffect(() => {
        dispatch(clearCurrentItem());
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await postRequest(`/v0/admin/users/create`, currentItem);
        if (res.status == 200) {
            dispatch(clearCurrentItem());
        }

        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

    return (
        <>
            <TitleBar href='/admin/users'>新規担当登録</TitleBar>

            <MainPannel>
                <form className='w-full flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                    <UserForm />

                    {/* ************************************************************************ */}
                    <div className='mt-[16px]'>
                        <Button type='submit' variant='contained' color='secondary'>
                            登録する
                        </Button>
                    </div>
                </form>

                <p className='mt-[24px]'>
                    ※登録後、担当にメールが送信されます。メール内のURLからアカウントの有効化を行ってください。
                </p>
            </MainPannel>
        </>
    );
};

export default UserCreatePage;
