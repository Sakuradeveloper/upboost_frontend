import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser, Schedule } from '@/interfaces';
import { getRequest, postRequest } from '@/utils/axios';
// import type { ResolvingMetadata from 'next/dist/lib/metadata/types/metadata-interface.js';

export interface userChapter {
    user: number|undefined;
    chapter: string|number|undefined|null;
}

type State = {
    item: {
        form: {
            question: string;
            options: string;
            correctAnswer: number;
            image: string;
            audio: string;
            playCount: number;
            chapter:number|string|undefined;
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
            question: 'string',
            options: 'string',
            correctAnswer: 0,
            image: 'string',
            audio: 'string',
            playCount: 1,
            chapter: undefined,
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

export const fetchTest = createAsyncThunk('teacher/fetchQuestion', async (id: number|undefined) => {
    const res = await getRequest(`/v0/teacher/questions/${id}`);

    const data = res.data.data.map((item: any) => ({
        ...item,
        options: JSON.parse(item.options) // Parse the options string into an array
    }));

    console.log("res.data : ", data)
    return {
        ...res,
        data:data
    };
});

export const fetchProblem = createAsyncThunk('student/fetchProblem', async (userChapter: userChapter) => {
    const {user, chapter} = userChapter
    // const res = await postRequest(`/v0/teacher/questions/`, { });
    const res = await getRequest(`/v0/student/questions?user=${user}&&chapter=${chapter}`);
    console.log("res.data : ===>>>", res.data)
    const data = res.data.data.map((item: any) => ({
        ...item,
        options: JSON.parse(item.options) // Parse the options string into an array
    }));

    console.log("res.data : ", data)
    return {
        ...res,
        data:data
    };
});

export const fetchSubjects = createAsyncThunk('admin/subjects', async () => {
    const res = await getRequest(`/v0/admin/subjects/`);
    return res;
});

export const slice = createSlice({
    name: 'test',
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
        builder.addCase(fetchTest.fulfilled, (state, action) => {
            console.log("action.payload.data : ", action.payload.data)
            if (action.payload.data) {
                state.items = {
                    ...state.items,
                    result:{
                        ...state.items.result,
                        data:[...action.payload.data] as any
                    }
                };
            }
        });
        builder.addCase(fetchProblem.fulfilled, (state, action) => {
            console.log("action.payload.data : ", action.payload.data)
            if (action.payload.data) {
                state.items = {
                    ...state.items,
                    result:{
                        ...state.items.result,
                        data:[...action.payload.data] as any
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
