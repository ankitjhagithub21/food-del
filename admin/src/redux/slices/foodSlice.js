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
    addFood:(state,action)=>{
      state.value=[...state.value,action.payload]
    },
    removeFood:(state,action)=>{
        state.value = state.value.filter((item)=>item._id!=action.payload)
    }
  },
})


export const { setAllFood,addFood,removeFood } = foodSlice.actions

export default foodSlice.reducer