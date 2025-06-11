import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import EmployeeService from "../../features/employee/EmployeeService"

export const getAllEmployees = createAsyncThunk('employees/getEmployees', async ({ page, size, filter }, { rejectWithValue }) => {
    try {
        const params = { name: filter.name || null };
        const res = await EmployeeService.getAllEmployees(page, size, params);

        return res.data;
    } catch (error) {
        return rejectWithValue("Unexpected response from server.");
    }
})

export const getEmployeeByUsername = createAsyncThunk('employees/getEmployeeByUsername', async (_, { rejectWithValue }) => {
    try {
        const res = await EmployeeService.getEmployeeByUsername();
        return res.data;
    } catch (error) {
        return rejectWithValue("Unexpected response from server.");
    }
})

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
        employeeByUsername: '',
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
                state.employees = action.payload.content;
                state.totalElements = action.payload.totalElements;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getAllEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getEmployeeByUsername.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmployeeByUsername.fulfilled, (state, action) => {
                state.loading = false;
                state.employeeByUsername = action.payload;
            })
            .addCase(getEmployeeByUsername.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default employeeSlice.reducer;