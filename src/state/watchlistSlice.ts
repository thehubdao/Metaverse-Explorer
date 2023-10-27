import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Metaverses } from "../enums/metaverses.enum";
import { LandListAPIResponse } from "../types/valuation.type";
import {TokenData} from "../interfaces/itrm/auth.interface";

interface IState {
  list: Record<Metaverses, LandListAPIResponse> | undefined;
  isLoading: boolean;
  error: string | undefined;
  metaverseSelected: Metaverses | undefined;
}

const initialState: IState = {
  list: undefined,
  isLoading: false,
  error: undefined,
  metaverseSelected: undefined
}

export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetchWatchlist',
  async ({ address, accessToken }: { address: string, accessToken: TokenData }) => {
    const watchlistRequest = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH_SERVICE ?? ""}/watchlistService/getWatchlist?address=${address}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authentication': `${accessToken.token ?? ""}`
        }
      }
    )
    return (await watchlistRequest.data) as Record<Metaverses, LandListAPIResponse>;
  }
)

export const watchlist = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    setWatchlistMetaverse(state, action:PayloadAction<Metaverses | undefined>) {
      state.metaverseSelected = action.payload;
  },
  cleanWatchlistMetaverse: (state) => state.metaverseSelected = undefined
  },
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

export const { setWatchlistMetaverse, cleanWatchlistMetaverse } = watchlist.actions

export default watchlist.reducer;