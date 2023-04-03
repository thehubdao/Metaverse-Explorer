import { createSlice } from '@reduxjs/toolkit'


const initialState: any[] = []

export const shopCartListSlice = createSlice({
  name: 'shopCartList',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => { },
    removeFromCart: (state) => { },
    resetCart: (state, { payload }) => initialState,
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, resetCart } = shopCartListSlice.actions

export default shopCartListSlice.reducer
