import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import EmployeeService from "../../features/employee/EmpolyeeService"

export const getAllEmployees = createAsyncThunk('employees/getEmployees', async ({ page, size, filter }, { rejectWithValue }) => {
    try {
        const params = { name: filter.name };
        const res = await EmployeeService.getAllEmployees(page, size, params);

        return res.data;
    } catch (error) {
        return rejectWithValue("Unexpected response from server.");
    }
})

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
        totalPages: 0,
        totalElements: 0,
        currentPage: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
                console.log("payload: " + action.payload);

                // state.totalElements = action.payload.totalElements;
                // state.currentPage = action.payload.currentPage;
                // state.totalPages = action.payload.totalPages;
            })
            .addCase(getAllEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default employeeSlice.reducer;