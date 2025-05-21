import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TransactionService from "../../features/user/TransactionService";


export const transaction = createAsyncThunk('transaction/history', async (userID, { rejectWithValue }) => {
    try {
        const res = await TransactionService.getTransaction(userID);
        return res.data;
    } catch (error) {
        return rejectWithValue("Unexpected response from server.");

    }
})

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        transactions: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(transaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(transaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(transaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default transactionSlice.reducer;