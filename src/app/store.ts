import { configureStore } from "@reduxjs/toolkit";

import loginReducer from './features/login/loginSlice';

const store = configureStore(
    {
        reducer: {
            login: loginReducer,
        }
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;