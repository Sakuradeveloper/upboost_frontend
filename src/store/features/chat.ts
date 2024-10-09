import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser, Schedule } from '@/interfaces';
import { getRequest, postRequest } from '@/utils/axios';
// import type { ResolvingMetadata from 'next/dist/lib/metadata/types/metadata-interface.js';

type State = {
    item: {
        form: {
            id: number | undefined;
            message: string;
            sender: number | undefined;
            // timestamp: Date;
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
            id: undefined,
            message: '',
            sender: undefined,
            // timestamp: new Date(),
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

export const fetchChat = createAsyncThunk('teacher/chat', async (roomName:string) => {
    console.log("fetchchat")
    const res = await getRequest(`/v0/teacher/chat/${roomName}`);
    return res;
});

export const slice = createSlice({
    name: 'chat',
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
        },
        addItem:(state:State, action) =>{
            state.items = {
                ...state.items,
                result:{
                    ...state.items.result,
                    data:[...state.items.result.data, action.payload]
                }
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchChat.fulfilled, (state, action) => {
            if (action.payload.data) {
                state.items = {
                    ...state.items,
                    result: action.payload.data as any
                };
            }
        });
        // builder.addCase(fetchSubject.fulfilled, (state, action) => {
        //     if (action.payload.data.id) {
        //         state.items = {
        //             ...state.items,
        //             result:{
        //                 ...state.items.result,
        //                 data:[action.payload.data]
        //             }
        //         };
        //     }
        // });
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
    setResult, 
    addItem,
} = slice.actions;

export default slice.reducer;
