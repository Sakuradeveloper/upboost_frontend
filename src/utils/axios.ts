import axios, { AxiosResponse } from 'axios';
import { getCookie, hasCookie, deleteCookie, setCookie } from 'cookies-next';

import { store } from '@/store/store';
import { loading, appendMessage } from '@/store/features/utils';
const dispatch = store.dispatch;

const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME || 'more_up_boost_token';
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export const baseURL = `${BACKEND_URL}/api`;
export const mediaURL = `${BACKEND_URL}/media`;

export const public_prefix = '';
export const owner_prefix = 'owner';
export const admin_prefix = 'admin';
export const member_prefix = 'member';

export interface IResponse {
    data: any;
    status: number;
}

export const apiInstance = axios.create({
    headers: { 'Content-Type': 'application/json' },
    baseURL,
    withCredentials: true,
    validateStatus: (status: number) => status <= 500
});

export const blobInstance = axios.create({
    headers: { 'Content-Type': 'application/json' },
    baseURL,
    withCredentials: true,
    responseType: 'blob',
    validateStatus: (status: number) => status <= 500
});

export const publicApiInstance = axios.create({
    headers: { 'Content-Type': 'application/json' },
    baseURL: baseURL + '/' + public_prefix,
    withCredentials: false,
    validateStatus: (status: number) => status <= 500
});

const token_refresh = async () => {
    const token = JSON.parse(getCookie(COOKIE_NAME) as string);

    const response = await apiInstance.post<AxiosResponse, IResponse>('/auth/refresh', { refresh: token.refresh });
    if (response.status === 401) {
        deleteCookie(COOKIE_NAME);
        delete apiInstance.defaults.headers['Authorization'];
        window.location.href = '/accounts/sign_in';
    }

    if (response.status === 200) {
        setCookie(COOKIE_NAME, JSON.stringify({ ...token, ...response.data }));
        apiInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
    }

    return response;
};

export const getPublicRequest = async (path: string, params?: any): Promise<IResponse> => {
    dispatch(loading(true));
    let response = await publicApiInstance.get<AxiosResponse, IResponse>(path, { params: params });

    if (response.status === 200 && response.data.msg)
        dispatch(appendMessage({ type: 'success', message: response.data.msg }));
    if ((response.status === 400 || response.status == 404) && response.data.msg)
        dispatch(appendMessage({ type: 'warning', message: response.data.msg }));
    if (response.status === 403) window.location.href = '/accounts/sign_in';
    if (response.status === 500) dispatch(appendMessage({ type: 'error', message: response.data.msg }));
    dispatch(loading(false));
    return response;
};

export const getRequest = async (path: string, params?: any): Promise<IResponse> => {
    dispatch(loading(true));
    let response = await apiInstance.get<AxiosResponse, IResponse>(path, { params: params });
    if (response.status === 401) {
        if (hasCookie(COOKIE_NAME)) {
            response = await token_refresh();
            if (response.status == 200) {
                response = await apiInstance.get<AxiosResponse, IResponse>(path, { params: params });
            }
        } else {
            window.location.href = '/accounts/sign_in';
        }
    }
    if (response.status === 200 && response.data.msg)
        dispatch(appendMessage({ type: 'success', message: response.data.msg }));
    if ((response.status === 400 || response.status == 404) && response.data.msg)
        dispatch(appendMessage({ type: 'warning', message: response.data.msg }));
    if (response.status === 403) window.location.href = '/accounts/sign_in';
    if (response.status === 500) dispatch(appendMessage({ type: 'error', message: response.data.msg }));
    dispatch(loading(false));
    return response;
};

export const getBlobRequest = async (path: string, params?: any): Promise<IResponse> => {
    dispatch(loading(true));
    blobInstance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(getCookie(COOKIE_NAME) as string).access}`;
    let response = await blobInstance.get<AxiosResponse, IResponse>(path, { params: params });
    if (response.status === 401) {
        if (hasCookie(COOKIE_NAME)) {
            response = await token_refresh();
            if (response.status == 200) {
                blobInstance.defaults.headers['Authorization'] = `Bearer ${
                    JSON.parse(getCookie(COOKIE_NAME) as string).access
                }`;
                response = await blobInstance.get<AxiosResponse, IResponse>(path, { params: params });
            }
        } else {
            window.location.href = '/accounts/sign_in';
        }
    }
    if (response.status === 200 && response.data.msg)
        dispatch(appendMessage({ type: 'success', message: response.data.msg }));
    if ((response.status === 400 || response.status == 404) && response.data.msg)
        dispatch(appendMessage({ type: 'warning', message: response.data.msg }));
    if (response.status === 403) window.location.href = '/accounts/sign_in';
    if (response.status === 500) dispatch(appendMessage({ type: 'error', message: response.data.msg }));
    dispatch(loading(false));
    return response;
};

export const postRequest = async (path: string, payload: any): Promise<IResponse> => {
    dispatch(loading(true));
    let response = await apiInstance.post<AxiosResponse, IResponse>(path, payload);
    if (response.status === 401) {
        if (hasCookie(COOKIE_NAME)) {
            response = await token_refresh();
            if (response.status == 200) {
                response = await apiInstance.post<AxiosResponse, IResponse>(path, payload);
            }
        } else {
            window.location.href = '/accounts/sign_in';
        }
    }
    if (response.status === 200 && response.data.msg)
        dispatch(appendMessage({ type: 'success', message: response.data.msg }));
    if ((response.status === 400 || response.status == 404) && response.data.msg)
        dispatch(appendMessage({ type: 'warning', message: response.data.msg }));

    if (response.status === 403) window.location.href = '/accounts/sign_in';
    if (response.status === 500) dispatch(appendMessage({ type: 'error', message: response.data.msg }));
    dispatch(loading(false));
    return response;
};

export const postFormdata = async (path: string, formData: FormData): Promise<IResponse> => {
    dispatch(loading(true));
    let response = await apiInstance.post<AxiosResponse, IResponse>(path, formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    if (response.status === 401) {
        if (hasCookie(COOKIE_NAME)) {
            response = await token_refresh();
            if (response.status == 200) {
                response = await apiInstance.post<AxiosResponse, IResponse>(path, formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });
            }
        } else {
            window.location.href = '/accounts/sign_in';
        }
    }
    if (response.status === 200 && response.data.msg)
        dispatch(appendMessage({ type: 'success', message: response.data.msg }));
    if ((response.status === 400 || response.status == 404) && response.data.msg)
        dispatch(appendMessage({ type: 'warning', message: response.data.msg }));

    if (response.status === 403) window.location.href = '/accounts/sign_in';
    if (response.status === 500) dispatch(appendMessage({ type: 'error', message: response.data.msg }));
    dispatch(loading(false));
    return response;
};

export const patchRequest = async (path: string, payload: any): Promise<IResponse> => {
    dispatch(loading(true));
    let response = await apiInstance.patch<AxiosResponse, IResponse>(path, payload);
    if (response.status === 401) {
        if (hasCookie(COOKIE_NAME)) {
            response = await token_refresh();
            if (response.status == 200) {
                response = await apiInstance.patch<AxiosResponse, IResponse>(path, payload);
            }
        } else {
            window.location.href = '/accounts/sign_in';
        }
    }
    if (response.status === 200 && response.data.msg)
        dispatch(appendMessage({ type: 'success', message: response.data.msg }));
    if ((response.status === 400 || response.status == 404) && response.data.msg)
        dispatch(appendMessage({ type: 'warning', message: response.data.msg }));

    if (response.status === 403) window.location.href = '/accounts/sign_in';
    if (response.status === 500) dispatch(appendMessage({ type: 'error', message: response.data.msg }));
    dispatch(loading(false));
    return response;
};

export const patchFormData = async (path: string, formData: FormData): Promise<IResponse> => {
    dispatch(loading(true));
    let response = await apiInstance.patch<AxiosResponse, IResponse>(path, formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    if (response.status === 401) {
        if (hasCookie(COOKIE_NAME)) {
            response = await token_refresh();
            if (response.status == 200) {
                response = await apiInstance.patch<AxiosResponse, IResponse>(path, formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });
            }
        } else {
            window.location.href = '/accounts/sign_in';
        }
    }
    if (response.status === 200 && response.data.msg)
        dispatch(appendMessage({ type: 'success', message: response.data.msg }));
    if ((response.status === 400 || response.status == 404) && response.data.msg)
        dispatch(appendMessage({ type: 'warning', message: response.data.msg }));

    if (response.status === 403) window.location.href = '/accounts/sign_in';
    if (response.status === 500) dispatch(appendMessage({ type: 'error', message: response.data.msg }));
    dispatch(loading(false));
    return response;
};

export const deleteRequest = async (path: string, params: any): Promise<IResponse> => {
    dispatch(loading(true));
    let response = await apiInstance.delete<AxiosResponse, IResponse>(path, { params: params });
    if (response.status === 401) {
        if (hasCookie(COOKIE_NAME)) {
            response = await token_refresh();
            if (response.status == 200) {
                response = await apiInstance.delete<AxiosResponse, IResponse>(path, { params: params });
            }
        } else {
            window.location.href = '/accounts/sign_in';
        }
    }
    if (response.status === 200 && response.data.msg)
        dispatch(appendMessage({ type: 'success', message: response.data.msg }));
    if ((response.status === 400 || response.status == 404) && response.data.msg)
        dispatch(appendMessage({ type: 'warning', message: response.data.msg }));

    if (response.status === 403) window.location.href = '/accounts/sign_in';
    if (response.status === 500) dispatch(appendMessage({ type: 'error', message: response.data.msg }));
    dispatch(loading(false));
    return response;
};
