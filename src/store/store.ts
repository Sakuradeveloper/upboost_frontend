import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import logger from 'redux-logger';

import shared_data from './features/shared_data';
import utils from './features/utils';
import login from './features/login';
import forgot_password from './features/forgot_password';
import reset_password from './features/reset_password';
import change_password from './features/change_password';
import profile from './features/profile';
import user from './features/user';
import teacher from './features/teacher';
import domain from './features/domain';
import customer from './features/customer';
import memo from './features/memo';
import user_analysis from './features/user_analysis';
import mail_template from './features/mail_template';
import mail from './features/mail';
import mail_inbox from './features/mail_inbox';
import backup from './features/backup';
import schedule from './features/schedule';
import notification from './features/notification';
import trial from './features/trial';
import lecture_schedule from './features/lecture_schedule';
import subject from './features/subject';
import student from './features/student';
import progress from './features/progress';
import chat from './features/chat';
import online_test from './features/online_test';
export const store = configureStore({
    reducer: {
        shared_data,
        utils,
        login,
        forgot_password,
        reset_password,
        change_password,
        profile,
        user,
        teacher,
        domain,
        customer,
        memo,
        user_analysis,
        mail_template,
        mail,
        mail_inbox,
        backup,
        notification,
        trial,
        schedule,
        lecture_schedule,
        subject,
        student,
        progress,
        chat,
        online_test,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({}).concat(process.env.NODE_ENV !== 'production' ? [logger] : [])
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
