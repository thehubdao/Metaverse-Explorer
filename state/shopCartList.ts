import { createSlice } from '@reduxjs/toolkit'

const initialState: { list: any[], length: number } = {
  list: [],
  length: 0
}

export const shopCartListSlice = createSlice({
  name: 'shopCartList',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const isLandContained = state.list.find(land => land.tokenId === payload.tokenId)
      if (!isLandContained) {
        state.list = [...state.list, payload]
        state.length = state.length + 1
      }
    },
    removeFromCart: (state, { payload }) => {
      const filteredList = state.list.filter(land => land.tokenId !== payload.tokenId)
      state.list = filteredList
      state.length = filteredList.length
    },
    resetCart: () => initialState,
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, resetCart } = shopCartListSlice.actions

export default shopCartListSlice.reducer
