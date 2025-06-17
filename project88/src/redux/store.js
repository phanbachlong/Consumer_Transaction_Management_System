import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice"
import { transactionReducer, transactionByUserIDReducer } from "./slices/transactionSlice"
import { balanceReducer, profileReducer, userReducer } from "./slices/userSlice"
import depositReducer from "./slices/depositSlice";
import employeeReducer from "./slices/employeeSlice";

export const store = configureStore({
    reducer: {
        register: registerReducer,
        transaction: transactionReducer,
        profile: profileReducer,
        user: userReducer,
        deposit: depositReducer,
        balance: balanceReducer,
        employee: employeeReducer,
        transactionsByUserID: transactionByUserIDReducer
    }
})