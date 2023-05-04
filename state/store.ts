import { configureStore } from '@reduxjs/toolkit'

import networkReducer from "./network"
import accountReducer from "./account"
import watchlistReducer from './watchlist'
import shopCartListReducer from './shopCartList'
import portfolioReducer from './portfolio'


const store = configureStore({
  reducer: {
    network: networkReducer,
    account: accountReducer,
    shopCartList: shopCartListReducer,
    portfolio: portfolioReducer,
    watchlist: watchlistReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store