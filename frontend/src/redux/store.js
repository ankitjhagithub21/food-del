import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import foodSlice from './slices/foodSlice'
import cartSlice from './slices/cartSlice'


export const store = configureStore({
  reducer: {
    auth:authSlice,
    food:foodSlice,
    cart:cartSlice
    
  },
})