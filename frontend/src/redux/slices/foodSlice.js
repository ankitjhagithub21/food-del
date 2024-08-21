import { createSlice } from '@reduxjs/toolkit'

export const foodSlice = createSlice({
  name: 'food',
  initialState:{
   
    category:"Beef",
    
  },
  reducers: {
   
   
    setCategory:(state,action)=>{
      state.category = action.payload
    },
    
  },
})


export const { setAllFood,setCategory} = foodSlice.actions

export default foodSlice.reducer