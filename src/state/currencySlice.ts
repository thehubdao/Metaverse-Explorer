import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Currencies {
  Ethereum = 'eth',
  USDCoin = 'usdc'
}

interface CurrencyState {
  currencies: { [key in Currencies]: number };
}

const initialState: CurrencyState = {
  currencies: {
    [Currencies.Ethereum]: 0,
    [Currencies.USDCoin]: 0,
  },
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrencyValues(state, action: PayloadAction<CurrencyState['currencies']>) {
      state.currencies = action.payload;
    },
  },
});

export const { setCurrencyValues } = currencySlice.actions;
export default currencySlice.reducer;
