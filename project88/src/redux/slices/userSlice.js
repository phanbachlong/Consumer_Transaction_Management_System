import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProfileService from "../../features/user/ProfileService";
import UserService from "../../features/user/UserService";

export const userProfile = createAsyncThunk('userProfile', async (_, { rejectWithValue }) => {
    try {
        const response = await ProfileService.getProfile();

        if (response.status >= 200 && response.status < 300) {
            return {
                profile: response.data || "Profile fetched successfully",
            };
        } else {
            return rejectWithValue("Unexpected response from server.");
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getAllUsers = createAsyncThunk('getAllUsers', async ({ page, size, filter }, { rejectWithValue }) => {
    try {
        const params = { name: filter.name };
        const response = await UserService.getAllUsers(page, size, params);

        if (response.status >= 200 && response.status < 300) {
            return {
                users: response.data || "Users fetched successfully",
            };
        } else {
            return rejectWithValue("Unexpected response from server.");
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getBalance = createAsyncThunk('getBalance', async (_, { rejectWithValue }) => {
    try {
        const response = await UserService.getBalance();

        if (response.status >= 200 && response.status < 300) {
            return {
                balance: response.data || "Balance fetched successfully",
            };
        } else {
            return rejectWithValue("Unexpected response from server.")
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;

            })
            .addCase(userProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        totalPages: 0,
        currentPage: 0,
        totalElements: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload.users;
                state.currentPage = action.payload.users.currentPage;
                state.totalElements = action.payload.users.totalElements;
                state.totalPages = action.payload.users.totalPages;
                state.loading = false;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

const balanceSlice = createSlice({
    name: 'balance',
    initialState: {
        balance: '',
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBalance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBalance.fulfilled, (state, action) => {
                state.loading = false;
                state.balance = action.payload;
            })
            .addCase(getBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const profileReducer = profileSlice.reducer;
export const userReducer = userSlice.reducer;
export const balanceReducer = balanceSlice.reducer;
