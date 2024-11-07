import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppSelector } from '@/store/hooks';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { MdLogout, MdSettings } from 'react-icons/md';
import { IoMailUnreadOutline } from 'react-icons/io5';
import MainCard from '../components/MainCard';
import Transitions from '../components/Transitions';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const router = useRouter();
    const theme = useTheme();
    const { user, logout } = useAuth();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const customization = useAppSelector(state => state.utils);

    const handleLogout = async () => {
        logout && logout();
        router.push('/sign_in');
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            router.push(route);
        }
    };
    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light,
                            color: `${theme.palette.primary.light}!important`
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={`${user.avatar_url || "/images/users/user-round.svg"}`}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup='true'
                        color='inherit'
                    />
                }
                label={<MdSettings size='1.5rem' color={theme.palette.primary.main} />}
                variant='outlined'
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
                color='primary'
            />
            <Popper
                placement='bottom-end'
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    border={false}
                                    elevation={16}
                                    content={false}
                                    boxShadow
                                    shadow={theme.shadows[16]}
                                >
                                    <Box sx={{ p: 2, pb: 0 }}>
                                        <Stack>
                                            <Stack direction='row' spacing={0.5} alignItems='center'>
                                                <Typography variant='h4'>こにちは,</Typography>
                                                <Typography component='span' variant='h4' sx={{ fontWeight: 400 }}>
                                                    {user?.user_info?.last_name} {user?.user_info?.first_name}
                                                </Typography>
                                            </Stack>
                                            {user.permission == 'customer' && (
                                                <Typography variant='subtitle2'>{user.user_info?.role?.name}</Typography>
                                            )}
                                        </Stack>
                                    </Box>
                                    <PerfectScrollbar
                                        style={{
                                            height: '100%',
                                            maxHeight: '400px',
                                            overflowX: 'hidden',
                                            overflowY: 'hidden'
                                        }}
                                    >
                                        <Box sx={{ p: 2 }}>
                                            <Divider />
                                            <List
                                                component='nav'
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down('md')]: {
                                                        minWidth: '100%'
                                                    },
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5
                                                    }
                                                }}
                                            >
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `${customization.borderRadius}px`
                                                    }}
                                                    selected={selectedIndex === 0}
                                                    onClick={event =>
                                                        handleListItemClick(event, 0, '/accounts/profile')
                                                    }
                                                >
                                                    <ListItemIcon>
                                                        <MdSettings size='1.3rem' />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant='body2'>アカウント情報</Typography>
                                                        }
                                                    />
                                                </ListItemButton>
                                                {user.permission == 'customer' && (
                                                    <ListItemButton
                                                        sx={{
                                                            borderRadius: `${customization.borderRadius}px`
                                                        }}
                                                        selected={selectedIndex === 1}
                                                        onClick={event => handleListItemClick(event, 1, '/mail/inbox')}
                                                    >
                                                        <ListItemIcon>
                                                            <IoMailUnreadOutline size='1.3rem' />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Grid
                                                                    container
                                                                    spacing={1}
                                                                    justifyContent='space-between'
                                                                >
                                                                    <Grid item>
                                                                        <Typography variant='body2'>
                                                                            受信トレイ
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                )}
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `${customization.borderRadius}px`
                                                    }}
                                                    selected={selectedIndex === 4}
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        <MdLogout size='1.3rem' />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={<Typography variant='body2'>ログアウト</Typography>}
                                                    />
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                    </PerfectScrollbar>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
