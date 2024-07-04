import { createSlice } from '@reduxjs/toolkit'

export const foodSlice = createSlice({
  name: 'food',
  initialState:{
    value:[],
    category:"Beef",
    total:0
  },
  reducers: {
   
    setAllFood: (state, action) => {
      state.value = action.payload
    },
    setCategory:(state,action)=>{
      state.category = action.payload
    },
    setTotal:(state,action)=>{
      state.total = action.payload
    }
  },
})


export const { setAllFood,setCategory,setTotal } = foodSlice.actions

export default foodSlice.reducer