import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/interfaces';
import { getRequest } from '@/utils/axios';
import { Moment } from 'moment';

type State = {
	item: {
		form: {
            condition:string;
            plan:string;
            otherPlan:string;
            recording:string;
            book:string;
            vocabulary:string;
            payment:string;
            startDate:string|null;
            reason:string|null;
			id?: number;
			name: string;
			email:string;
			confirmEmail:string;
			nameKana: string;
			ageGroup: string;
			phone: string;
			firstChoiceDate: Date | null;
			firstChoiceTime: string;
			secondChoiceDate: Date | null;
			secondChoiceTime: string;
			region: string;
			characterCount: number;
			vietnameseDialect: string;
			studyPurpose: string[];
			purposes: {
				partner: boolean;
				work: boolean;
				travel: boolean;
				other: boolean;
			};
			otherPurpose: string;
			availability: string;
			preferredPlan: string;
			experience: string;
			mediaSource: string;
			otherInfo: string;
			medium: string;
			otherMedium: string;
			errors: {
				name: boolean;
				nameKana: boolean;
				email: boolean;
				confirmEmail: boolean;
				phone: boolean;
			};
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
			data: IUser[];
			total: number;
		};
	};
};

const initialState: State = {
	item: {
		form: {
            condition:'',
            plan: '',
            otherPlan:'',
            recording:'',
            book:'',
            vocabulary:'',
            payment:'',
            startDate:'',
            reason:'',
			name: '',
			nameKana: '',
			email: '',
			confirmEmail: '',
			phone: '',
			ageGroup: '',
			firstChoiceDate: null,
			firstChoiceTime: '',
			secondChoiceDate: null,
			secondChoiceTime: '',
			region: '',
			characterCount: 0,
			vietnameseDialect: '',
			studyPurpose: [] as string[],
			purposes: {
				partner: false,
				work: false,
				travel: false,
				other: false,
			},
			otherPurpose: '',
			availability: '',
			preferredPlan: '',
			experience:'',
			mediaSource: '',
			otherInfo: '',
			medium:'',
			otherMedium:'',
			errors: {
				name: false,
				nameKana: false,
				email: false,
				confirmEmail: false,
				phone: false,
			}
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

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (filter: any) => {
    const res = await getRequest('/v0/admin/users', filter);
    return res;
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (id: number) => {
    const res = await getRequest(`/v0/admin/users/${id}`);
    return res;
});

export const slice = createSlice({
	name: 'application',
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
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			if (action.payload.data.data) {
				state.items = {
					...state.items,
					result: action.payload.data as any
				};
			}
		});
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			if (action.payload.data.id) {
				state.item = {
					...state.item,
					form: action.payload.data as any
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
