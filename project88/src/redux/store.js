import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice"
import transactionReducer from "./slices/transactionSlice"
import profileReducer from "./slices/userSlice"

export const store = configureStore({
    reducer: {
        register: registerReducer,
        transaction: transactionReducer,
        profile: profileReducer
    }
})