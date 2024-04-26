import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IState {
  list: object,
  isLoading: boolean,
  error: any
}

const initialState: IState = {
  list: {},
  isLoading: false,
  error: null
}

export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetchWatchlist',
  async ({address, accessToken}: {address: unknown, accessToken: any}) => {
    const watchlistRequest = await axios.get(
      `/api/watchlistService/getWatchlist?address=${address}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authentication': `${accessToken.token}`
        }
      }
    )
    const watchlist = await watchlistRequest.data;
    return watchlist;
  }
)

export const watchlist = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWatchlist.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchWatchlist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    })
    builder.addCase(fetchWatchlist.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    })
  }
})

export default watchlist.reducer