import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/interfaces';
import { getRequest } from '@/utils/axios';

type State = {
    item: {
        form: {
            id?: number;
            last_name: string;
            first_name: string;
            last_name_furi: string;
            first_name_furi: string;
            email: string;
            phone: string;
            role: number;
            is_allowed: boolean;
            avatar_url?:string;
        };
        errors: any;
    };
    items: {
        filter: {
            keyword: string;
            order_by: string;
            page: number;
            pageSize: number;
        };
        result: {
            data: IUser[];
            total: number;
        };
    };
};

const initialState: State = {
    item: {
        form: {
            id: 0,
            last_name: '',
            first_name: '',
            last_name_furi: '',
            first_name_furi: '',
            email: '',
            phone: '',
            role: 0,
            is_allowed: true
        },
        errors: {}
    },
    items: {
        filter: {
            keyword: '',
            order_by: 'id',
            page: 1,
            pageSize: 10
        },
        result: {
            data: [],
            total: 0
        }
    }
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (filter: any) => {
    const res = await getRequest('/v0/admin/users', filter);
    return res;
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (id: number) => {
    const res = await getRequest(`/v0/admin/users/${id}`);
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
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            if (action.payload.data.data) {
                state.items = {
                    ...state.items,
                    result: action.payload.data as any
                };
            }
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
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
