import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Popper,
    Stack,
    Tooltip,
    Typography,
    Badge 
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { MdLogout, MdSettings } from 'react-icons/md';
import { IoMailUnreadOutline } from 'react-icons/io5';
import MainCard from '../components/MainCard';
import Transitions from '../components/Transitions';
import { fetchNotification } from '@/store/features/notification';
import { RiMessage2Fill } from 'react-icons/ri';

// ==============================|| PROFILE MENU ||============================== //

const NofificationSection = () => {
    const router = useRouter();
    const theme = useTheme();
    const { user, logout } = useAuth();

    // const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const customization = useAppSelector(state => state.utils);

    const handleLogout = async () => {
        logout && logout();
        router.push('/sign_in');
    };

    // const handleClose = event => {
    //     if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //         return;
    //     }
    //     setOpen(false);
    // };

    // const handleListItemClick = (event, index, route = '') => {
    //     setSelectedIndex(index);
    //     handleClose(event);

    //     if (route && route !== '') {
    //         router.push(route);
    //     }
    // };
    // const handleToggle = () => {
    //     setOpen(prevOpen => !prevOpen);
    // };

    // const prevOpen = useRef(open);
    // useEffect(() => {
    //     if (prevOpen.current === true && open === false) {
    //         anchorRef.current.focus();
    //     }

    //     prevOpen.current = open;
    // }, [open]);

    // ========================== 
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(state => state.notification.items.result.data);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    console.log("+++++++++++===================>>>>>>>>>>>>>>>>>", user?.id)
    // useEffect(()=>{
    //   if(user?.id)
    //     dispatch(fetchNotification(user?.id))
    // },[dispatch, user?.id])

    
    const notificationTotal = notifications?.reduce((total, item)=>{
        if(!item.is_admin_read)
          return total+=1;
        return total;
      }, 0)

    const color = notificationTotal ? 'primary' : 'secondary';

    return (
        <>
            <React.Fragment>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Badge badgeContent={notificationTotal} color={`secondary`}>  {/* Replace '4' with the dynamic count */}
                      <NotificationsIcon color={color}/>
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {
                  notifications.length == 0 ?
                    <MenuItem >
                      <Avatar
                        sx={{
                          backgroundColor: '#eee', // Gray for read, red for unread
                          color: '#fff', // White text color for visibility
                        }}
                      >
                        <RiMessage2Fill />
                      </Avatar> 申し込みはありません。
                    </MenuItem>
                  :
                    notifications?.slice(0, 10).map((item, index)=>
                      <MenuItem 
                        onClick={()=>{
                          handleClose();
                          router.push('/teachers/notifications');
                        }} 
                        key={index}>
                        {(item.notification_type =="application") ? 
                          <Avatar
                            sx={{
                              backgroundColor: item.is_admin_read ? '#673ab7' : '#ff1744', // Gray for read, red for unread
                              color: '#fff', // White text color for visibility
                            }}
                          >
                            <RiMessage2Fill />
                          </Avatar>:<Avatar />} {item.message}
                      </MenuItem>
                    )
                  }
              </Menu>
            </React.Fragment>
        </>
    );
};

export default NofificationSection;
