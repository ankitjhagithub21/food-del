import { createSlice } from '@reduxjs/toolkit'

export const foodSlice = createSlice({
  name: 'food',
  initialState:{
    value:[]
  },
  reducers: {
   
    setAllFood: (state, action) => {
      state.value = action.payload
    },
  },
})


export const { setAllFood } = foodSlice.actions

export default foodSlice.reducer