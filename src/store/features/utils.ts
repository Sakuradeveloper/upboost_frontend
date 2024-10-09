import { createSlice } from '@reduxjs/toolkit';
import config from '@/store/config';

export type Message = {
    message: string;
    type: 'success' | 'warning' | 'error';
};

type utilState = {
    loading: boolean;
    messages: Message[];
    navOpen: boolean;
    isOpen: any[];
    defaultId: string;
    fontFamily: string;
    borderRadius: number;
    opened: true;
};

const initialState: utilState = {
    loading: false,
    messages: [],
    navOpen: true,
    isOpen: [],
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
};

export const util = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        reset: () => initialState,
        loading: (state: utilState, action) => {
            const payload = action.payload;
            state.loading = payload;
        },
        appendMessage: (state: utilState, action) => {
            const payload = action.payload as Message;
            state.messages = [...state.messages, payload];
        },
        clearMessages: (state: utilState) => {
            state.messages = [];
        },
        setNavOpen: (state: utilState, action) => {
            const payload = action.payload;
            state.navOpen = payload;
        },
        setOpened: (state: utilState, action) => {
            const payload = action.payload;
            state.opened = payload;
        },
        setDefaultId: (state: utilState, action) => {
            const payload = action.payload;
            state.defaultId = payload;
        },
        setFontFamily: (state: utilState, action) => {
            const payload = action.payload;
            state.fontFamily = payload;
        },
        setBorderRadius: (state: utilState, action) => {
            const payload = action.payload;
            state.borderRadius = payload;
        },
        setIsOpen: (state: utilState, action) => {
            const payload = action.payload;
            state.isOpen = payload;
        }
    }
});

export const {
    reset,
    loading,
    appendMessage,
    clearMessages,
    setNavOpen,
    setOpened,
    setDefaultId,
    setFontFamily,
    setBorderRadius,
    setIsOpen
} = util.actions;

export default util.reducer;
