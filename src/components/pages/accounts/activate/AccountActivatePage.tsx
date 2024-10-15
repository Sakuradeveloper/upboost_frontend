import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getRequest, postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue, setError, clearError } from '@/store/features/reset_password';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Copyright from '@/components/molecules/Copyright';
import BlankLayout from '@/components/templates/layout/BlankLayout';
import Loading from '@/components/templates/Loading';
import Page_404 from '@/components/templates/Page_404';
import Page_400 from '@/components/templates/Page_400';

const AccountActivatePage = () => {
    const router = useRouter();
    const params = useSearchParams();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(0);
    const currentItem = useAppSelector(state => state.reset_password.item.form);
    const errors = useAppSelector(state => state.reset_password.item.errors);

    useEffect(() => {
        const validateToken = async () => {
            const token = params.get('token') || '';
            const res = await getRequest(`/account/activate?token=${token}`);
    
            if (res.status == 200) {
                dispatch(setCurrentItemValue({ token: token }));
            }
            setLoading(res.status);
        };
        validateToken();
    }, [dispatch, params]);

    // const validateToken = async () => {
    //     const token = params.get('token') || '';
    //     const res = await getRequest(`/account/activate?token=${token}`);

    //     if (res.status == 200) {
    //         dispatch(setCurrentItemValue({ token: token }));
    //     }
    //     setLoading(res.status);
    // };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await postRequest('/account/activate', currentItem);
        if (res.status == 200) {
            dispatch(clearError());
            router.push('/accounts/sign_in');
        }

        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

    if (loading == 0) return <Loading />;

    if (loading == 400) return <Page_400 />;

    if (loading == 404) return <Page_404 />;

    return (
        <BlankLayout>
            <div className='w-full min-h-screen flex items-center justify-center'>
                <Container component='main' maxWidth='xs' sx={{ width: '100%' }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', color: 'white' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h1'>
                            MORE UP BOOST
                        </Typography>

                        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 1 }}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                type='password'
                                label='パスワード'
                                name='new_password'
                                autoComplete='new_password'
                                autoFocus
                                value={currentItem.new_password}
                                onChange={e => dispatch(setCurrentItemValue({ new_password: e.target.value }))}
                                error={errors.new_password ? true : false}
                                helperText={errors.new_password ? errors.new_password : ''}
                            />

                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                type='password'
                                label='パスワード（確認用）'
                                name='confirm_password'
                                autoComplete='confirm_password'
                                autoFocus
                                value={currentItem.confirm_password}
                                onChange={e => dispatch(setCurrentItemValue({ confirm_password: e.target.value }))}
                                error={errors.confirm_password ? true : false}
                                helperText={errors.confirm_password ? errors.confirm_password : ''}
                            />

                            <Button type='submit' fullWidth variant='contained' color='secondary' sx={{ mt: 3, mb: 2 }}>
                                パスワードを設定する
                            </Button>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </div>
        </BlankLayout>
    );
};

export default AccountActivatePage;
