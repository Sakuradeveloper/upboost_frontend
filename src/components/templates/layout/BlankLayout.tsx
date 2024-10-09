'use client';

import { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

const BlankLayout = ({ children }: Props) => {
    return <>{children}</>;
};

export default BlankLayout;
