import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser, Schedule } from '@/interfaces';
import { getRequest } from '@/utils/axios';

type State = {
    item: {
        form: {
            id?: number;
            major: string;
            state: string;
            date: string;
            start_time: string;
            end_time:string;
            teacher_id: number;
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
            data: Schedule[];
            total: number;
        };
    };
};

const initialState: State = {
    item: {
        form: {
            id: 0,
            major: '標準語(北部弁)',
            state: 'pending',
            date: '',
            start_time: '',
            end_time: '',
            teacher_id: 1,
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

export const fetchLectureSchedules = createAsyncThunk('student/fetchSchedule', async (id: number|undefined) => {
    const res = await getRequest(`/v0/student/schedule/${id}`);
    return res; 
});

// export const fetchLectureSchedule = createAsyncThunk('student/schedule', async (id: number) => {
//     const res = await getRequest(`/v0/student/schedules/${id}`);
//     return res;
// });

export const slice = createSlice({
    name: 'schedule',
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
        builder.addCase(fetchLectureSchedules.fulfilled, (state, action) => {
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
        // builder.addCase(fetchLectureSchedule.fulfilled, (state, action) => {
        //     if (action.payload.data.id) {
        //         state.item = {
        //             ...state.item,
        //             form: action.payload.data as any
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
    setResult
} = slice.actions;

export default slice.reducer;
