import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice"
import transactionReducer from "./slices/transactionSlice"
import { balanceReducer, profileReducer, userReducer } from "./slices/userSlice"
import depositReducer from "./slices/depositSlice";

export const store = configureStore({
    reducer: {
        register: registerReducer,
        transaction: transactionReducer,
        profile: profileReducer,
        user: userReducer,
        deposit: depositReducer,
        balance: balanceReducer
    }
})