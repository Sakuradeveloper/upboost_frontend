import { FormEvent } from 'react';
import { postRequest } from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError, setCurrentItemValue, setError } from '@/store/features/change_password';

import { Button, TextField } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';

const PasswordForm = () => {
    const dispatch = useAppDispatch();
    const { setPending } = useAuth();

    const currentItem = useAppSelector(state => state.change_password.item.form);
    const errors = useAppSelector(state => state.change_password.item.errors);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setPending!(true);

        const res = await postRequest(`/account/password`, currentItem);

        if (res.status == 200) {
            dispatch(clearError());
        }
        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }

        setPending!(false);
    };
    return (
        <div>
            <TitleBar>パスワード設定</TitleBar>

            <MainPannel>
                <form className='w-full flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                    {/* ************************************************************************ */}
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>現在のパスワード</FormLabel>
                        <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                type='password'
                                value={currentItem.password}
                                onChange={e => dispatch(setCurrentItemValue({ password: e.target.value }))}
                                error={errors.password ? true : false}
                                helperText={errors.password ? errors.password : ''}
                            />
                        </div>
                    </div>

                    {/* ************************************************************************ */}
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>新しいパスワード</FormLabel>
                        <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                type='password'
                                value={currentItem.new_password}
                                onChange={e => dispatch(setCurrentItemValue({ new_password: e.target.value }))}
                                error={errors.new_password ? true : false}
                                helperText={errors.new_password ? errors.new_password : ''}
                            />
                        </div>
                    </div>

                    {/* ************************************************************************ */}
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>
                            新しいパスワード <br />
                            （確認用）
                        </FormLabel>
                        <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                type='password'
                                value={currentItem.confirm_password}
                                onChange={e => dispatch(setCurrentItemValue({ confirm_password: e.target.value }))}
                                error={errors.confirm_password ? true : false}
                                helperText={errors.confirm_password ? errors.confirm_password : ''}
                            />
                        </div>
                    </div>

                    {/* ************************************************************************ */}
                    <div className='mt-[16px]'>
                        <Button type='submit' variant='contained' color='secondary'>
                            変更する
                        </Button>
                    </div>
                </form>
            </MainPannel>
        </div>
    );
};

export default PasswordForm;
