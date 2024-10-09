import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicApiInstance } from '@/utils/axios';
import { IDomain, IProperty, IRole, IStatus } from '@/interfaces';

type SharedDataState = {
    domain_data: IDomain[];
    role_data: IRole[];
    status_data: IStatus[];
    property_data: IProperty[];
};

const initialState: SharedDataState = {
    domain_data: [],
    status_data: [],
    role_data: [],
    property_data: []
};

const fetchDomainData = createAsyncThunk('shared_data/fetchDomainData', async () => {
    const res = await publicApiInstance.get(`/data/domain`);

    if (res.status === 200) {
        return res.data as IDomain[];
    } else {
        return [];
    }
});

const fetchRoleData = createAsyncThunk('shared_data/fetchRoleData', async () => {
    const res = await publicApiInstance.get(`/data/role`);

    if (res.status === 200) {
        return res.data as IRole[];
    } else {
        return [];
    }
});

const fetchStatusData = createAsyncThunk('shared_data/fetchStatusData', async () => {
    const res = await publicApiInstance.get(`/data/status`);

    if (res.status === 200) {
        return res.data as IStatus[];
    } else {
        return [];
    }
});

const fetchPropertyData = createAsyncThunk('shared_data/fetchPropertyData', async () => {
    const res = await publicApiInstance.get(`/data/property`);

    if (res.status === 200) {
        return res.data as IProperty[];
    } else {
        return [];
    }
});

export const slice = createSlice({
    name: 'shared_data',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: builder => {
        builder.addCase(fetchDomainData.fulfilled, (state: SharedDataState, action: any) => {
            state.domain_data = action.payload as IDomain[];
        });
        builder.addCase(fetchRoleData.fulfilled, (state: SharedDataState, action: any) => {
            state.role_data = action.payload as IRole[];
        });
        builder.addCase(fetchPropertyData.fulfilled, (state: SharedDataState, action: any) => {
            state.property_data = action.payload as IProperty[];
        });
        builder.addCase(fetchStatusData.fulfilled, (state: SharedDataState, action: any) => {
            state.status_data = action.payload as IStatus[];
        });
    }
});

export const { reset } = slice.actions;
export { fetchRoleData, fetchStatusData, fetchPropertyData, fetchDomainData };
export default slice.reducer;
