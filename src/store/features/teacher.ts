import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser, Teacher } from '@/interfaces';
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
            avatar_url?:string|undefined;
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
            data: Teacher[];
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

// export const fetchTeachers = createAsyncThunk('teacher/fetchTeachers', async (filter: any) => {
//     const res = await getRequest('/v0/teacher/teachers', filter);
//     return res;
// });

export const fetchTeacher = createAsyncThunk('teacher/fetchTeacher', async (id: number|undefined) => {
    const res = await getRequest(`/v0/student/teachers/${id}`);
    return res;
});

// export const fetchStudent = createAsyncThunk('teacher/student', async (id: number|undefined) => {
//     const res = await getRequest(`/v0/teacher/students/${id}`);
//     return res; 
// });

export const slice = createSlice({
    name: 'teacher',
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
        // builder.addCase(fetchTeachers.fulfilled, (state, action) => {
        //     if (action.payload.data.data) {
        //         state.items = {
        //             ...state.items,
        //             result: action.payload.data as any
        //         };
        //     }
        // });
        // builder.addCase(fetchTeacher.fulfilled, (state, action) => {
        //     if (action.payload.data.id) {
        //         state.item = {
        //             ...state.item,
        //             form: action.payload.data as any
        //         };
        //     }
        // });
        builder.addCase(fetchTeacher.fulfilled, (state, action) => {
            if (action.payload.data) {
                state.items = {
                    ...state.items,
                    result: action.payload.data as any
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
