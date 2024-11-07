import { useRouter } from 'next/navigation';
import { postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue, setError, clearError } from '@/store/features/forgot_password';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Copyright from '@/components/molecules/Copyright';
import BlankLayout from '@/components/templates/layout/BlankLayout';

const PasswordForgotPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.forgot_password.item.form);
    const errors = useAppSelector(state => state.forgot_password.item.errors);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await postRequest('/auth/password/forgot', currentItem);
        if (res.status == 200) {
            dispatch(clearError());
            router.push('/sign_in');
        }

        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

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

                        <Typography component='p' sx={{ fontSize: 14, mt: 4, lineHeight: 1.5 }}>
                            メールアドレスを入力後「パスワードを再設定する」ボタンを押して下さい。ご登録のメールアドレスまでパスワード再設定用のURLが送信されます。
                        </Typography>

                        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 1 }}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                label='メールアドレス'
                                name='email'
                                autoComplete='email'
                                autoFocus
                                value={currentItem.email}
                                onChange={e => dispatch(setCurrentItemValue({ email: e.target.value }))}
                                error={errors.email ? true : false}
                                helperText={errors.email ? errors.email : ''}
                            />

                            <Button type='submit' fullWidth variant='contained' color='secondary' sx={{ mt: 3, mb: 2 }}>
                                パスワードを再設定する
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href='/sign_in' variant='body2' color='secondary'>
                                        ログインはこちら
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </div>
        </BlankLayout>
    );
};

export default PasswordForgotPage;
