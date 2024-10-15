'use client';

import { useEffect, ReactNode, memo, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Providers } from '@/store/provider';
import { reset } from '@/store/features/utils';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ja';
moment.locale('ja');

import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/templates/Loading';
import Pending from '@/components/templates/Pending';
import theme from '@/components/templates/themes';
interface Props {
    children: ReactNode;
}

const ComponentWrapper = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const { loading, pending, isAuthenticated } = useAuth();
    const pathname = usePathname()!;
    const params = useSearchParams()!;

    const customization = useAppSelector(state => state.utils);

    useEffect(() => {
        dispatch(reset());
    }, [pathname, params, dispatch]);

    return (
        <ThemeProvider theme={theme(customization)}>
            <div className={clsx('flex flex-col w-full min-h-screen overflow-x-hidden', {})}>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {children}
                        <Pending pending={pending} />
                    </>
                )}
            </div>
        </ThemeProvider>
    );
};

const DefaultLayout = ({ children }: Props) => {
    return (
        <body className='w-full'>
            <AnimatePresence>
                <Providers>
                    <AuthProvider>
                        <Suspense fallback={<Loading />}>
                            <ComponentWrapper>
                                <div id='top'></div>

                                <main className='w-full flex-grow tracking-wide font-normal text-[14px]'>
                                    {children}
                                </main>
                            </ComponentWrapper>
                        </Suspense>
                    </AuthProvider>
                </Providers>
            </AnimatePresence>
        </body>
    );
};

export default memo(DefaultLayout);
