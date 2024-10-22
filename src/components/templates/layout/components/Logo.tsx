import { ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import config from '@/store/config';
import Image from 'next/image';

const LogoSection = () => {
    const theme = useTheme();

    return (
        <ButtonBase disableRipple component={'a'} href={config.defaultPath}>
            <Image src="/images/logo/logo.png" width={32} height={32} alt="logo" />
        </ButtonBase>
    );
};

export default LogoSection;
