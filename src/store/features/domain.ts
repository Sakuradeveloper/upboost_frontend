import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMailDomain } from '@/interfaces';
import { getRequest } from '@/utils/axios';

type State = {
    item: {
        form: {
            id?: number;
            host: string;
            port: string;
            username: string;
            password: string;
            imap_host: string;
        };
        errors: any;
    };
    items: {
        filter: {
            keyword: string;
            page: number;
            pageSize: number;
        };
        result: {
            data: IMailDomain[];
            total: number;
        };
    };
};

const initialState: State = {
    item: {
        form: {
            id: 0,
            host: '',
            port: '587',
            username: '',
            password: '',
            imap_host: 'imap.gmail.com'
        },
        errors: {}
    },
    items: {
        filter: {
            keyword: '',
            page: 1,
            pageSize: 10
        },
        result: {
            data: [],
            total: 0
        }
    }
};

export const fetchDomains = createAsyncThunk('user/fetchDomains', async (filter: any) => {
    const res = await getRequest('/v0/admin/domains', filter);
    return res;
});

export const fetchDomain = createAsyncThunk('user/fetchDomain', async (id: number) => {
    const res = await getRequest(`/v0/admin/domains/${id}`);
    return res;
});

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
        clearCurrentItem: (state: State) => {
            state.item = initialState.item;
        },
        setCurrentItem: (state: State, action) => {
            state.item = {
                ...state.item,
                form: action.payload
            };
        },
        setCurrentItemValue: (state: State, action) => {
            state.item = {
                ...state.item,
                form: {
                    ...state.item.form,
                    ...action.payload
                }
            };
        },
        setError: (state: State, action) => {
            state.item = {
                ...state.item,
                errors: action.payload
            };
        },
        clearError: (state: State) => {
            state.item = {
                ...state.item,
                errors: initialState.item.errors
            };
        },
        setFilter: (state: State, action) => {
            state.items = {
                ...state.items,
                filter: action.payload
            };
        },
        setFilterValue: (state: State, action) => {
            state.items = {
                ...state.items,
                filter: {
                    ...state.items.filter,
                    ...action.payload
                }
            };
        },
        clearFilter: (state: State) => {
            state.items = {
                ...state.items,
                filter: initialState.items.filter
            };
        },
        setResult: (state: State, action) => {
            state.items = {
                ...state.items,
                result: action.payload
            };
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchDomains.fulfilled, (state, action) => {
            if (action.payload.data.data) {
                state.items = {
                    ...state.items,
                    result: action.payload.data as any
                };
            }
        });
        builder.addCase(fetchDomain.fulfilled, (state, action) => {
            if (action.payload.data.id) {
                state.item = {
                    ...state.item,
                    form: action.payload.data as any
                };
            }
        });
    }
});

export const {
    reset,
    clearCurrentItem,
    setCurrentItem,
    setCurrentItemValue,
    setError,
    clearError,
    setFilter,
    setFilterValue,
    clearFilter,
    setResult
} = slice.actions;

export default slice.reducer;
