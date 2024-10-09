import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser, Schedule } from '@/interfaces';
import { getRequest } from '@/utils/axios';
// import type { ResolvingMetadata from 'next/dist/lib/metadata/types/metadata-interface.js';

type State = {
    item: {
        form: {
            type: string;
            level: string;
            order: number;
            title: string;
            description: string;
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
            data: any [];
            total: number;
        };
    };
};

const initialState: State = {
    item: {
        form: {
            type: '',
            level: '',
            order: 0,
            title: '',
            description: '',
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

export const fetchSubject = createAsyncThunk('admin/fetchSubject', async (id: number|undefined) => {
    const res = await getRequest(`/v0/admin/subject/${id}`);
    return res; 
});

export const fetchSubjects = createAsyncThunk('admin/subjects', async () => {
    const res = await getRequest(`/v0/admin/subjects/`);
    return res;
});

export const slice = createSlice({
    name: 'subject',
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
        builder.addCase(fetchSubjects.fulfilled, (state, action) => {
            console.log(action.payload.data, ":::::::::::::::::::::")
            if (action.payload.data) {
                state.items = {
                    ...state.items,
                    result: {
                        ...state.items.result,
                        data: action.payload.data as any
                    }
                };
            }
        });
        builder.addCase(fetchSubject.fulfilled, (state, action) => {
            if (action.payload.data.id) {
                state.items = {
                    ...state.items,
                    result:{
                        ...state.items.result,
                        data:[action.payload.data]
                    }
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
