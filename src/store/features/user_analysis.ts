import { createSlice } from '@reduxjs/toolkit';

type State = {
    item: {
        form: {
            name: string;
            total: number;
            analysis: {
                id: number;
                name: string;
                count: number;
            }[];
        };
        errors: any;
    };
};

const initialState: State = {
    item: {
        form: {
            name: '',
            total: 0,
            analysis: []
        },
        errors: {}
    }
};

export const slice = createSlice({
    name: 'user_analysis',
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
                errors: {}
            };
        }
    }
});

export const { reset, clearCurrentItem, setCurrentItem, setCurrentItemValue, setError, clearError } = slice.actions;

export default slice.reducer;
