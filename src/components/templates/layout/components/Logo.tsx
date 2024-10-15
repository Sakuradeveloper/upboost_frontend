import { ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import config from '@/store/config';
import Image from 'next/image';

const LogoSection = () => {
    const theme = useTheme();

    return (
        <ButtonBase disableRipple component={'a'} href={config.defaultPath}>
            <Image src="/images/logo/logo.png" className='w-[32px]' alt="logo" />
        </ButtonBase>
    );
};

export default LogoSection;
