// material-ui
import { useTheme } from '@mui/material/styles';

import LogoSection from './Logo';
// import SearchSection from './SearchSection';
import ProfileSection from '../sections/ProfileSection';
import NotificationSection from '../sections/NotificationSection';

import { MdMenu } from 'react-icons/md';
import { Avatar, Box, ButtonBase } from '@mui/material';

interface Props {
    handleLeftDrawerToggle: () => void;
}

const Header = ({ handleLeftDrawerToggle }: Props) => {
    const theme: any = useTheme();

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component='div' sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <div className='flex items-center gap-[8px]'>
                        <LogoSection />
                        <h3 className='text-[20px] font-bold mt-[4px]'>MORE UP BOOST</h3>
                    </div>
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color='inherit'
                    >
                        <MdMenu size='1.3rem' />
                    </Avatar>
                </ButtonBase>
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification & profile */}
            {/* <NotificationSection />
            <ProfileSection /> */}
            <NotificationSection/>
            <ProfileSection />
        </>
    );
};

export default Header;
