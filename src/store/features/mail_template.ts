import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRequest } from '@/utils/axios';
import { IMailTemplate } from '@/interfaces';

type State = {
    item: {
        form: {
            id: number;
            subject: string;
            body: string;
        };
        errors: any;
    };
    items: {
        filter: {
            keyword: string;
            page: 1;
            pageSize: 10;
        };
        result: {
            data: IMailTemplate[];
            total: number;
        };
    };
};

const initialState: State = {
    item: {
        form: {
            id: 0,
            subject: '',
            body: ''
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

export const fetchMailTemplates = createAsyncThunk('mail_template/fetchMailTemplates', async (filter: any) => {
    const res = await getRequest('/v0/mail_templates', filter);
    return res;
});

export const fetchMailTemplate = createAsyncThunk('mail_template/fetchMailTemplate', async (id: number) => {
    const res = await getRequest(`/v0/mail_templates/${id}`);
    return res;
});

export const slice = createSlice({
    name: 'mail_template',
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
        builder.addCase(fetchMailTemplates.fulfilled, (state, action) => {
            if (action.payload.data.data) {
                state.items = {
                    ...state.items,
                    result: action.payload.data as any
                };
            }
        });
        builder.addCase(fetchMailTemplate.fulfilled, (state, action) => {
            state.item = {
                ...state.item,
                form: action.payload.data as any
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
