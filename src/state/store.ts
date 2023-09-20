import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currencySlice';
import loginReducer from './loginSlice';
import watchlistReducer from './watchlistSlice';
import portfolioReducer from "./portfolioSlice";
import coinGeckoReducer from "./coin-gecko.slice";
import heatmapReducer from "./heatmapSlice";

const store = configureStore({
  reducer: {
    currency: currencyReducer,
    login: loginReducer,
    heatmap: heatmapReducer,
    watchlist: watchlistReducer,
    portfolio: portfolioReducer,
    coinGecko: coinGeckoReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
