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

export const fetchNotification = createAsyncThunk('fetchnotification', async (id: number) => {
    const res = await getRequest(`/notification/${id}`);
    return res;
});

export const fetchNotificationAdmin = createAsyncThunk('fetchnotificationAdmin', async (id: number) => {
    const res = await getRequest(`/v0/admin/notification/${id}`);
    return res;
});

export const fetchNotificationTable = createAsyncThunk('fetchNotificationTable', async (id: number) => {
    const res = await postRequest(`/notification/${id}`, id);
    return res;
});

export const fetchNotificationTableAdmin = createAsyncThunk('fetchNotificationTableAdmin', async (id: number) => {
    const res = await postRequest(`/v0/admin/notification/${id}`, id);
    return res;
});

export const acceptApplication = createAsyncThunk('acceptapplication', async (id:number)=>{
    const res = await getRequest(`/notification/accept/${id}`)
    return res;
})

export const allowApplication = createAsyncThunk('allowapplication', async (id:number)=>{
    const res = await getRequest(`/v0/admin/notification/allow/${id}`)
    return res;
})

// export const updateReadState = createAsyncThunk('/createUpdateSate', async(id:number)=>{
//     const res = await getRequest(`/notification/accept/${id}`)
//     return res;
// })

export const fetchMails = createAsyncThunk('mail/fetchMails', async (params: any) => {
    const res = await getRequest(`/v0/mails/inbox/domain/${params.domain}/customer/${params.id}`);
    return res;
});

export const fetchSentMails = createAsyncThunk('mail/fetchSentMails', async (payload: any) => {
    const res = await getRequest(`/v0/mails/sent`, payload);
    return res;
});

export const fetchSentMail = createAsyncThunk('mail/fetchSentMail', async (id: number) => {
    const res = await getRequest(`/v0/mails/sent/${id}`, null);
    return res;
});

export const slice = createSlice({
    name: 'notification',
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
        builder.addCase(fetchMails.fulfilled, (state, action) => {
            if (action.payload.data.data) {
                state.items = {
                    ...state.items,
                    result: action.payload.data as any
                };
            }
        });
        builder.addCase(fetchSentMails.fulfilled, (state, action) => {
            if (action.payload.data.data) {
                state.items = {
                    ...state.items,
                    result: action.payload.data as any
                };
            }
        });
        builder.addCase(fetchSentMail.fulfilled, (state, action) => {
            if (action.payload.data.data) {
                state.items = {
                    ...state.items,
                    result: action.payload.data as any
                };
            }
        });
        builder.addCase(fetchNotification.fulfilled, (state, action)=>{
            if(action.payload.data.data){
                state.items = {
                    ...state.items,
                    result:action.payload.data as any
                }
            }
        });
        builder.addCase(fetchNotificationAdmin.fulfilled, (state, action)=>{
            if(action.payload.data.data){
                state.items = {
                    ...state.items,
                    result:action.payload.data as any
                }
            }
        });
        builder.addCase(fetchNotificationTable.fulfilled, (state, action)=>{
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
        });
        builder.addCase(fetchNotificationTableAdmin.fulfilled, (state, action)=>{
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
        });
        builder.addCase(acceptApplication.fulfilled, (state, action)=>{
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
        builder.addCase(allowApplication.fulfilled, (state, action)=>{
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
        // builder.addCase(updateReadState.fulfilled, (state, action)=>{
        //     if(action.payload.data.data){
        //         const newDataArray = state.items.result.data.map(item =>
        //             item.id === action.payload.data.data.id ? action.payload.data.data : item
        //         );
        //         state.items = {
        //             ...state.items,
        //             result:{
        //                 ...state.items.result,
        //                 data:newDataArray
        //             }
        //         }
        //     }
        // })
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
