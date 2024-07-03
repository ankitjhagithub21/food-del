import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    user:null,
    showLogin:false,
    currState:'Login',
    loading:true,
  },
  reducers: {
    
    setUser: (state, action) => {
      state.user = action.payload
    },
    setShowLogin: (state, action) => {
      state.showLogin = action.payload
    },
    setCurrState: (state, action) => {
      state.currState = action.payload
    },
    setLoading:(state,action)=>{
      state.loading = action.payload
    }
  },
})


export const { setUser,setShowLogin,setCurrState,setLoading } = authSlice.actions

export default authSlice.reducer