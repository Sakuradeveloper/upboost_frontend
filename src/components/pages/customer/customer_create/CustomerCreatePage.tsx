import { FormEvent, useEffect } from 'react';
import { postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setError } from '@/store/features/customer';

import { Button } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import CustomerForm from './sections/CustomerForm';

const CustomerCreatePage = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.customer.item.form);

    useEffect(() => {
        dispatch(clearCurrentItem());
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await postRequest(`/v0/customers/create`, currentItem);
        if (res.status == 200) {
            dispatch(clearCurrentItem());
        }

        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'member']}>
                <MainLayout>
                    <TitleBar href='/customers'>顧客新規登録</TitleBar>

                    <MainPannel>
                        <form className='w-full max-w-[600px] flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                            <CustomerForm />

                            {/* ************************************************************************ */}
                            <div className='mt-[16px]'>
                                <Button type='submit' variant='contained' color='secondary'>
                                    登録する
                                </Button>
                            </div>
                        </form>
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default CustomerCreatePage;
