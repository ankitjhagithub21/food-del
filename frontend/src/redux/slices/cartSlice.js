import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState:{
   items:null
    
  },
  reducers: {
    
    setCart: (state, action) => {
      state.items = action.payload
    },
  
  },
})


export const { setCart} = cartSlice.actions

export default cartSlice.reducer