import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TokenData } from "../interfaces/common.interface";
import { WatchlistResponse } from "../interfaces/watchlist.interface";

interface IState {
  list: WatchlistResponse | undefined,
  isLoading: boolean,
  error: string | undefined
}

const initialState: IState = {
  list: undefined,
  isLoading: false,
  error: undefined
}

export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetchWatchlist',
  async ({ address, accessToken }: { address: string, accessToken: TokenData }) => {
    const watchlistRequest = await axios.get(
      `${process.env.AUTH_SERVICE ?? ""}/watchlistService/getWatchlist?address=${address}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authentication': `${accessToken.token ?? ""}`
        }
      }
    )
    return (await watchlistRequest.data) as WatchlistResponse;
  }
)

export const watchlist = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWatchlist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWatchlist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchWatchlist.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
})

export default watchlist.reducer;