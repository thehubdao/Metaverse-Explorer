import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './loginSlice';
import watchlistReducer from './watchlistSlice';
import portfolioReducer from "./portfolioSlice";

const store = configureStore(
    {
        reducer: {
            login: loginReducer,
            watchlist: watchlistReducer,
            portfolio: portfolioReducer
        }
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;