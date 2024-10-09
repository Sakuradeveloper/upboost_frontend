import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IBackup } from '@/interfaces';
import { getRequest } from '@/utils/axios';

type State = {
    item: {
        form: {};
        errors: any;
    };
    items: {
        filter: {
            keyword: string;
            page: number;
            pageSize: number;
        };
        result: {
            data: IBackup[];
            total: number;
        };
    };
};

const initialState: State = {
    item: {
        form: {},
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

export const fetchBackupList = createAsyncThunk('backup/fetchBackupList', async (filter: any) => {
    const res = await getRequest('/v0/owner/backup/list', filter);
    if (res.status == 200) {
        return res.data;
    } else {
        return {
            data: [],
            total: 0
        };
    }
});

export const slice = createSlice({
    name: 'backup',
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
        builder.addCase(fetchBackupList.fulfilled, (state, action) => {
            if (action.payload.data) {
                state.items = {
                    ...state.items,
                    result: action.payload as any
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
