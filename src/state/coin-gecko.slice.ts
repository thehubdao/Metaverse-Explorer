import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetCoinGeckoPrices } from "../utils/itrm/coin-gecko.util";
import { CoinValuesType } from "../types/common.type";
import { DEFAULT_COIN_VALUES } from "../constants/common.constant";


interface CoinGeckoState {
    isLoading: boolean;
    error?: string;
    coins: CoinValuesType;
}

const initialState: CoinGeckoState = {
    isLoading: false,
    coins: DEFAULT_COIN_VALUES,
}

export const fetchCoinGecko = createAsyncThunk(
    'portfolio/fetchCoinGecko',
    async () => {
        const result = await GetCoinGeckoPrices();
        return result;
    }
)

export const coinGecko = createSlice({
    name: 'coin-gecko',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCoinGecko.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCoinGecko.fulfilled, (state, action) => {
            state.isLoading = false;     
            state.coins = action.payload;
        });
        builder.addCase(fetchCoinGecko.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
})

export default coinGecko.reducer;