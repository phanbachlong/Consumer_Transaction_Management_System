import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProfileService from "../../features/user/ProfileService";
import UserService from "../../features/user/UserService";

export const userProfile = createAsyncThunk('userProfile', async (payload, { rejectWithValue }) => {
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

export const getAllUsers = createAsyncThunk('getAllUsers', async (payload, { rejectWithValue }) => {
    try {
        const response = await UserService.getAllUsers();

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
                state.loading = false;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const profileReducer = profileSlice.reducer;
export const userReducer = userSlice.reducer;
