import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import TransactionService from "../../features/user/TransactionService";


export const transaction = createAsyncThunk('transaction/history', async ({ userID, page, size, filter }, { rejectWithValue }) => {
    try {
        const formatStartDateTime = (dateStr) => {
            if (!dateStr) return null;
            // Nếu chỉ có ngày, thêm thời gian mặc định
            return dateStr.length === 10 ? `${dateStr}T00:00:00` : dateStr;
        }
        const formatEndDateTime = (dateStr) => {
            if (!dateStr) return null;
            // Nếu chỉ có ngày, thêm thời gian mặc định
            return dateStr.length === 10 ? `${dateStr}T23:59:59` : dateStr;
        }
        const params = { startDate: formatStartDateTime(filter.startDate) || null, endDate: formatEndDateTime(filter.endDate) || null, name: filter.name || null };
        const res = await TransactionService.getTransaction(userID, page, size, params);

        return res.data;
    } catch (error) {
        return rejectWithValue("Unexpected response from server.");

    }
})

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        transactions: [],
        totalPages: 0,
        totalElements: 0,
        currentPage: 0,
        loading: false,
        error: null
    },
    reducers: {
        resetTransaction: (state) => {
            state.transactions = null;
            state.totalPages = 0;
            state.totalElements = 0;
            state.currentPage = 0;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(transaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(transaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.totalElements = action.payload.totalElements;
                state.currentPage = action.payload.number;
            })
            .addCase(transaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default transactionSlice.reducer;