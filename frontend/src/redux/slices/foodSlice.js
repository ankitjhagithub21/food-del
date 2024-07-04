import { createSlice } from '@reduxjs/toolkit'

export const foodSlice = createSlice({
  name: 'food',
  initialState:{
    value:[],
    category:"Beef"
  },
  reducers: {
   
    setAllFood: (state, action) => {
      state.value = action.payload
    },
    setCategory:(state,action)=>{
      state.category = action.payload
    }
  },
})


export const { setAllFood,setCategory } = foodSlice.actions

export default foodSlice.reducer