import { createSlice } from '@reduxjs/toolkit';

type State = {
    item: {
        form: {
            email: string;
        };
        errors: any;
    };
};

const initialState: State = {
    item: {
        form: {
            email: ''
        },
        errors: {}
    }
};

export const slice = createSlice({
    name: 'forgot_password',
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
