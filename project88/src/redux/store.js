import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice"
import transactionReducer from "./slices/transactionSlice"

export const store = configureStore({
    reducer: {
        register: registerReducer,
        transaction: transactionReducer
    }
})