import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import foodSlice from './slices/foodSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    food:foodSlice
  },
})