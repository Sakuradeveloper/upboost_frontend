'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

import Loading from './Loading';

interface Props {
    children?: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname()!;
    const { isAuthenticated, user, loading, logout } = useAuth();

    useEffect(() => {
        if (!isAuthenticated && !loading) router.push(`/accounts/sign_in?redirect_to=${pathname}`);
    }, [isAuthenticated, loading, pathname, params, router]);

    if (loading) return null;

    if (isAuthenticated) {
        return children;
    } else return <Loading />;
};

export default AuthLayout;
