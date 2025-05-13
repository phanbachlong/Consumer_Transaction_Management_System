import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import RegisterService from "../../features/register/RegisterService"

export const register = createAsyncThunk('register/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const res = await RegisterService.createUser(userData);

        if (res.status >= 200 && res.status < 300) {
            return {
                message: res.data || "User registered successfully",
            };
        } else {
            return rejectWithValue("Unexpected response from server.");
        }

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Registration fail!!!");
    }
})


const registerSlice = createSlice({
    name: 'register',
    initialState: {
        message: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.message = action.payload;
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default registerSlice.reducer;