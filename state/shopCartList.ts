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
      const isLandContained = state.list.find(land => land.tokenId === payload.land.tokenId)
      if (!isLandContained) {
        state.list = [...state.list, payload.land]
        state.length = state.length + 1
      }
      localStorage.setItem(`shoplist_${payload.address}`, JSON.stringify(state.list));
    },
    removeFromCart: (state, { payload }) => {
      const filteredList = state.list.filter(land => land.tokenId !== payload.land.tokenId)
      state.list = filteredList
      state.length = filteredList.length
      localStorage.setItem(`shoplist_${payload.address}`, JSON.stringify(state.list));
    },
    resetCart: () => initialState,
    localStorageCharge: (state, { payload }) => {
      state.list = payload
      state.length = payload.length
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, resetCart, localStorageCharge } = shopCartListSlice.actions

export default shopCartListSlice.reducer
