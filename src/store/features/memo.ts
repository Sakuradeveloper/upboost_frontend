import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMemo } from '@/interfaces';
import { getRequest } from '@/utils/axios';

type State = {
    item: {
        form: {
            id?: number;
            content: string;
            created_at?: string;
        };
        errors: any;
    };
    items: {
        filter: {};
        result: {
            data: IMemo[];
            total: number;
        };
    };
};

const initialState: State = {
    item: {
        form: {
            id: 0,
            content: '',
            created_at: ''
        },
        errors: {}
    },
    items: {
        filter: {},
        result: {
            data: [],
            total: 0
        }
    }
};

export const fetchMemoByCustomerId = createAsyncThunk('memo/fetchMemoByCustomerId', async (id: number) => {
    const res = await getRequest(`/v0/customers/${id}/memo`);
    return res;
});

export const slice = createSlice({
    name: 'memo',
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
        builder.addCase(fetchMemoByCustomerId.fulfilled, (state, action) => {
            state.items = {
                ...state.items,
                result: action.payload.data as any
            };
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
