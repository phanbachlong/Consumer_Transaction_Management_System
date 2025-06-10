import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DepositService from "../../features/user/DepositService";

export const deposit = createAsyncThunk("deposit/depositSlice", async (_, { rejectWithValue }) => {
    try {
        const res = await DepositService.getDeposit();
        if (!res) {
            throw new Error("No data received from the server");
        }

        return res;
    } catch (error) {
        console.error("Error fetching deposits:", error);
        return rejectWithValue("Failed to fetch deposits");
    }
});

const depositSlice = createSlice({
    name: "deposit",
    initialState: {
        deposits: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetDeposit: (state) => {
            state.deposits = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deposit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deposit.fulfilled, (state, action) => {

                state.loading = false;
                state.deposits = action.payload;
            })
            .addCase(deposit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch deposits";
            });
    },
});

export default depositSlice.reducer;