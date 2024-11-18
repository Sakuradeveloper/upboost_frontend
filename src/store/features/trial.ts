import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICustomer, IMail, IMailAttachment, IMailInbox, IProperty, IStatus } from '@/interfaces';
import { getRequest, postRequest } from '@/utils/axios';
import { appendMessage } from './utils';


type State = {
    item: {
        form: {
            notification_type: string;
            message: string;
            application: string;
            is_read: boolean;
            is_allowed: boolean;
            user:string;
        };
        errors: any;
    };
    items: {
        filter: {
        };
        result: {
            customer?: ICustomer;
            data: any[];
            total: number;
        };
    };
};

const initialState: State = {
    item: {
        form: {
            notification_type: 'string',
            message: 'string',
            application: 'string',
            is_read: false,
            is_allowed: false,
            user:'string',
        },
        errors: {}
    },

    items: {
        filter: {
        },
        result: {
            data: [],
            total: 0
        }
    }
};

export const fetchApplicationTrial = createAsyncThunk('fetchApplicationTrial', async (id: number) => {
    const res = await getRequest(`/v0/teacher/application/${id}`);
    return res;
});

export const acceptApplicationTrial = createAsyncThunk('acceptApplicationTrial', async (id:number)=>{
    const res = await postRequest(`/v0/teacher/application/${id}`, id)
    return res;
})

export const fetchApplicationTrialAdmin = createAsyncThunk('fetchApplicationTrialAdmin', async (id: number) => {
    const res = await getRequest(`/v0/admin/application/${id}`);
    return res;
});

export const allowApplicationTrial = createAsyncThunk('allowApplicationTrial', async (id:number)=>{
    const res = await postRequest(`/v0/admin/application/${id}`, id)
    return res;
})

export const slice = createSlice({
    name: 'trial',
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
        builder.addCase(fetchApplicationTrial.fulfilled, (state, action)=>{
            if(action.payload.data.data){
                state.items = {
                    ...state.items,
                    result:action.payload.data as any
                }
            }
        });
        builder.addCase(fetchApplicationTrialAdmin.fulfilled, (state, action)=>{
            if(action.payload.data.data){
                state.items = {
                    ...state.items,
                    result:action.payload.data as any
                }
            }
        });
        builder.addCase(acceptApplicationTrial.fulfilled, (state, action)=>{
            if(action.payload.data.data){
                const newDataArray = state.items.result.data.map(item =>
                    item.id === action.payload.data.data.id ? action.payload.data.data : item
                );
                state.items = {
                    ...state.items,
                    result:{
                        ...state.items.result,
                        data:newDataArray
                    }
                }
            }
        })
        builder.addCase(allowApplicationTrial.fulfilled, (state, action)=>{
            if(action.payload.data.data){
                const newDataArray = state.items.result.data.map(item =>
                    item.id === action.payload.data.data.id ? action.payload.data.data : item
                );
                state.items = {
                    ...state.items,
                    result:{
                        ...state.items.result,
                        data:newDataArray
                    }
                }
            }
        })
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
