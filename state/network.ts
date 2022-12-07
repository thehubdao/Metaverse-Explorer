import { createSlice } from '@reduxjs/toolkit'

import { NetworkState } from "../lib/types";
import { Network } from '../lib/enums';


const initialState: NetworkState = { value: Network.ETHEREUM }

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    changeToPolygon: state => {
      state.value = Network.POLYGON
    },
    changeToEthereum: state => {
      state.value = Network.ETHEREUM
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeToPolygon, changeToEthereum } = networkSlice.actions

export default networkSlice.reducer