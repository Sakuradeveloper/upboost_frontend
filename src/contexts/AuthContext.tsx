'use client';

import React, { useState, useContext, useEffect, useCallback } from 'react';
import { getCookie, setCookie, hasCookie, deleteCookie } from 'cookies-next';
import { IUser } from '@/interfaces';
import { apiInstance, getRequest, publicApiInstance } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearMessages } from '@/store/features/utils';

import toast, { Toaster } from 'react-hot-toast';
import { fetchNotification, fetchNotificationAdmin } from '@/store/features/notification';

type AuthContextProps = {
    isAuthenticated: boolean;
    loading: boolean;
    pending: boolean;
    user: IUser | null;
    setLoading: (loading: boolean) => void;
    setPending: (pending: boolean) => void;
    login: (credential: any, callback: (user: IUser | null) => void) => void;
    logout: () => void;
    refresh: () => void;
    register: (details: any, callback: (user: IUser | null) => void) => void;
};

const AuthContext = React.createContext<Partial<AuthContextProps>>({});

interface AuthProviderProps {
    children: React.ReactNode;
}

const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME!;

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const dispatch = useAppDispatch();

    const messages = useAppSelector(state => state.utils.messages);
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [pending, setPending] = useState(true);

    const handleResponse = useCallback(
        async (response: any, callback: (user: IUser | null) => void) => {
            if (response.status === 200 || response.status === 201) {
                setCookie(COOKIE_NAME, JSON.stringify(response.data));
                apiInstance.defaults.headers.Authorization = `Bearer ${response.data.access}`;
                console.log("handle response =========          =============")
                const res = await apiInstance.get(`/me`);
                if (res.status === 200) {
                    console.log(res.data, "============    me   handleresponse    ============")
                    // dispatch(fetchNotification(res.data.me?.id))
                    // if(res.data.me.role.role_id =='admin')
                    //     dispatch(fetchNotificationAdmin(res.data.me?.id))
                    // else if(res.data.me.role.role_id =='teacher')
                    //     dispatch(fetchNotification(res.data.me?.id))
                    setUser(res.data.me);
                    callback(res.data.me);
                } else {
                    setUser(null);
                    callback(null);
                }
            } else {
                setUser(null);
                callback(null);
            }
        },
        []
    );

    useEffect(() => {
        function loadUserFromCookies() {
            if (hasCookie(COOKIE_NAME)) {
                const token = JSON.parse(getCookie(COOKIE_NAME) as string);
                if (token) {
                    apiInstance.defaults.headers.Authorization = `Bearer ${token.access}`;
                    getRequest(`/me`)
                        .then(res => {
                            if (res.status === 200) {
                                console.log(res.data.me, "=================888888888888888888")
                                // if(res.data.me.role.role_id =='admin')
                                //     dispatch(fetchNotificationAdmin(res.data.me?.id))
                                // else if(res.data.me.role.role_id =='teacher')
                                //     dispatch(fetchNotification(res.data.me?.id))
                                setUser(res.data.me);
                                setPending(false);
                                setLoading(false);
                            } else {
                                setPending(false);
                                setLoading(false);
                            }
                        })
                        .catch(err => {
                            setPending(false);
                            setLoading(false);
                        });
                } else {
                    setPending(false);
                    setLoading(false);
                }
            } else {
                setPending(false);
                setLoading(false);
            }
        }
        loadUserFromCookies();
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            messages.map(_msg => {
                if (_msg.type == 'success')
                    toast.success(_msg.message, {
                        style: {
                            padding: '16px',
                            maxWidth: 600
                        }
                    });
                if (_msg.type == 'warning')
                    toast.success(_msg.message, {
                        style: {
                            padding: '16px',
                            maxWidth: 600
                        },
                        iconTheme: {
                            primary: '#FFCC33',
                            secondary: '#FFFAEE'
                        }
                    });
                if (_msg.type == 'error')
                    toast.error(_msg.message, {
                        style: {
                            padding: '16px',
                            maxWidth: 600
                        }
                    });
            });

            dispatch(clearMessages());
        }
    }, [messages]);

    const login = async (credential: any, callback: (user: IUser | null) => void) => {
        setPending(true);
        logout();

        try {
            const response = await apiInstance.post('/auth/login', credential);
            await handleResponse(response, callback);
        } catch (error) {
            console.error(error);
            setUser(null);
            callback(null);
        }

        setPending(false);
    };

    const register = async (details: any, callback: (user: IUser | null) => void) => {
        setPending(true);

        try {
            const registerResponse = await publicApiInstance.post('/auth/register', details);
            if (registerResponse.status === 201) {
                const loginResponse = await apiInstance.post('/auth/login', details);
                await handleResponse(loginResponse, callback);
            } else {
                setUser(null);
                callback(null);
            }
        } catch (error) {
            console.error(error);
            setUser(null);
            callback(null);
        }

        setPending(false);
    };

    const refresh = async () => {
        try {
            console.log("refresh===========");
            const res = await apiInstance.get(`/me`);
            if (res.status === 200) {
                console.log(res.data.me, "=====================           refresh        =========")
                // dispatch(fetchNotification(res.data.me?.id))
                // if(res.data.me.role.role_id =='admin')
                //     dispatch(fetchNotification(res.data.me?.id))
                // else if(res.data.me.role.role_id =='teacher')
                //     dispatch(fetchNotification(res.data.me?.id))
                setUser(res.data.me);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setPending(true);

        deleteCookie(COOKIE_NAME);
        setUser(null);
        delete apiInstance.defaults.headers.Authorization;

        setPending(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                loading,
                pending,
                login: login,
                register: register,
                logout: logout,
                refresh: refresh,
                setLoading,
                setPending
            }}
        >
            {children}
            <Toaster />
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
