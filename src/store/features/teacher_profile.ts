import { createSlice } from '@reduxjs/toolkit';

type State = {
    item: {
        form: {
            name: string;
            last_name: string;
            first_name: string;
            last_name_furi: string;
            first_name_furi: string;
            email: string;
            phone: string;
            major: string;
            user_id: number;
        };
        errors: any;
    };
};

const initialState: State = {
    item: {
        form: {
            name: '',
            last_name: '',
            first_name: '',
            last_name_furi: '',
            first_name_furi: '',
            email: '',
            phone: '',
            major: '',
            user_id: 0,
        },
        errors: {}
    }
};

export const slice = createSlice({
    name: 'teacher_profile',
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
