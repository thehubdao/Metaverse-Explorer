import { createSlice } from '@reduxjs/toolkit'

import { AccountState } from '../lib/types'

const initialState: AccountState = {
  connected: false,
  address: undefined,
  chainId: 1,
  role: undefined,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    connect: (state, { payload }) => {
      state.connected = true
      state.address = payload.address
      state.chainId = payload.chainId
    },
    disconnect: (state) => initialState,
    setChain: (state, { payload }) => {
      state.chainId = payload
    },
    setAddress: (state, { payload }) => {
      state.address = payload
    },
    setRole: (state, { payload }) => {
      state.role = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { connect, disconnect, setChain, setAddress, setRole } =
  accountSlice.actions

export default accountSlice.reducer
