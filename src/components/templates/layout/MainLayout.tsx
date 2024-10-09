'use client';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setNavOpen } from '@/store/features/utils';

import { MdChevronRight } from 'react-icons/md';

import navigation from '../navigations';
import Breadcrumbs from './components/Breadcrumbs';
import MainWraaper from './components/MainWrapper';
import Header from './components/Header';
import Sidebar from './components/SideBar';

interface Props {
    children?: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const leftDrawerOpened = useAppSelector(state => state.utils.navOpen);

    const handleLeftDrawerToggle = () => {
        dispatch(setNavOpen(!leftDrawerOpened));
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position='fixed'
                color='inherit'
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>

            <Sidebar
                drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
                drawerToggle={handleLeftDrawerToggle}
            />

            <MainWraaper theme={theme} open={leftDrawerOpened}>
                <Breadcrumbs separator={MdChevronRight} navigation={navigation} icon title rightAlign />
                <div className='relative w-full'>{children}</div>
            </MainWraaper>
        </Box>
    );
};

export default MainLayout;
