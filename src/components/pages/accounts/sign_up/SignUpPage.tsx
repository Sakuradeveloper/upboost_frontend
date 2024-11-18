import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/login';
import { appendMessage } from '@/store/features/utils';

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

import BlankLayout from '@/components/templates/layout/BlankLayout';
import Copyright from '@/components/molecules/Copyright';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { fetchRoleData } from '@/store/features/shared_data';


const SignUpPage = () => {
    const router = useRouter();
    const { register } = useAuth();;
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.login.item.form);
    const errors = useAppSelector(state => state.login.item.errors);
    const shared_data = useAppSelector(state => state.shared_data);
    console.log(shared_data.role_data.filter(role => role.role_id !== 'admin'),"============>")

    useEffect(() => {
        dispatch(fetchRoleData());
    }, [dispatch]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(currentItem.password !== currentItem.confirmPass) {
            dispatch(appendMessage({ type: 'error', message: 'パスワードを再度入力してください。' }));
        }

        register &&
            (await register(currentItem, user => {
                if (user) {
                    router.push('/dashboard');
                    dispatch(appendMessage({ type: 'success', message: '登録が完了しました。' }));
                } else {
                    dispatch(appendMessage({ type: 'error', message: '問題が発生しましたので、再度ご登録ください。' }));
                }
            }));
    };

    return (
        <BlankLayout>
            <div className='w-full min-h-screen flex items-center justify-center'>
                <Container component='main' maxWidth='xs'>
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
                        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='パスワード'
                                type='password'
                                autoComplete='current-password'
                                value={currentItem.password}
                                onChange={e => dispatch(setCurrentItemValue({ password: e.target.value }))}
                                error={errors.password ? true : false}
                                helperText={errors.password ? errors.password : ''}
                            />
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                name='confirmPassword'
                                label='パスワード認証'
                                type='password'
                                autoComplete='current-password'
                                value={currentItem.confirmPass}
                                onChange={e => dispatch(setCurrentItemValue({ confirmPass: e.target.value }))}
                                error={errors.confirmPass ? true : false}
                                helperText={errors.confirmPass ? errors.comfirmPass : ''}
                            />
                            {shared_data.role_data.length ? <FormControl fullWidth required sx={{ mt:2 }}>
                                <InputLabel id="demo-simple-select-label">役割</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currentItem.role}
                                    label="role"
                                    onChange={e => dispatch(setCurrentItemValue({ role: e.target.value }))}
                                >
                                    <MenuItem value=''>選択する</MenuItem>
                                    {shared_data.role_data
                                        .filter(role => role.role_id == 'teacher')
                                        .map(({ id, name, role_id }) => (
                                            <MenuItem value={role_id} key={id}>
                                                {name}
                                            </MenuItem>
                                    ))}
                                    {/* <MenuItem value='teacher'>教師</MenuItem>
                                    <MenuItem value='student'>生徒</MenuItem> */}
                                </Select>
                            </FormControl>:''}
                            <Button type='submit' fullWidth variant='contained' color='secondary' sx={{ mt: 3, mb: 2 }}>
                                登録
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href='/sign_in' variant='body2' color='secondary'>
                                        ログインウィンドウへ
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

export default SignUpPage;
