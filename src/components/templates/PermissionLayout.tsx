'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

import Loading from './Loading';

interface Props {
    permission: ('super' | 'owner' | 'customer' | 'teacher' | 'student')[];
    role: ('admin' | 'teacher' | 'student')[];
    children?: ReactNode;
}

const PermissionLayout = ({ children, permission, role }: Props) => {
    const router = useRouter();
    const pathname = usePathname()!;
    const { user, logout } = useAuth();

    useEffect(() => {
        if (user) {
            // if (!permission.includes(user.permission)) {
            //     console.log(permission, user.permission);
            //     router.push(`/accounts/sign_in?redirect_to=${pathname}`);
            // }

            // if (user.permission == 'customer' && !['admin', 'member'].includes(user.user_info?.role.role_id)) {
            //     router.push(`/accounts/sign_in?redirect_to=${pathname}`);
            // }
            console.log(user, "------------------user")
            if (!role.includes(user.role?.role_id)) {
                // console.log(permission, user.permission);
                router.push(`/accounts/sign_in?redirect_to=${pathname}`);
            }
        }
    }, [user]);

    if (user) {
        return children;
    } else return <Loading />;
};

export default PermissionLayout;
