import { configureStore } from "@reduxjs/toolkit";

import loginReducer from './loginSlice';
import watchlistReducer from './watchlistSlice'

const store = configureStore(
    {
        reducer: {
            login: loginReducer,
            watchlist: watchlistReducer
        }
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;