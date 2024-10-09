import { forwardRef, useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsOpen, setOpened } from '@/store/features/utils';

import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface Props {
    item: any;
    level: number;
}

const NavItem = ({ item, level }: Props) => {
    const theme: any = useTheme();
    const dispatch = useAppDispatch();
    const customization = useAppSelector(state => state.utils);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    const Icon = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size='1.3rem' />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: customization.isOpen.findIndex(id => id === item?.id) > -1 ? 8 : 6,
                height: customization.isOpen.findIndex(id => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';

    const itemHandler = (id: string) => {
        dispatch(setIsOpen([id]));
        if (matchesSM) dispatch(setOpened(false));
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex(id => id === item.id);
        if (currentIndex > -1) {
            dispatch(setIsOpen([item.id]));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <ListItemButton
            href={item.url}
            target={itemTarget}
            disabled={item.disabled}
            sx={{
                borderRadius: `${customization.borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`
            }}
            selected={customization.isOpen.findIndex(id => id === item.id) > -1}
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography
                        variant={customization.isOpen.findIndex(id => id === item.id) > -1 ? 'h5' : 'body1'}
                        color='inherit'
                    >
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography
                            variant='caption'
                            sx={{ ...theme.typography.subMenuCaption }}
                            display='block'
                            gutterBottom
                        >
                            {item.caption}
                        </Typography>
                    )
                }
            />
            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );
};

export default NavItem;
