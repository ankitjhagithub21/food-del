import React from 'react'
import { useDispatch } from 'react-redux'
import toast from "react-hot-toast"
import { setUser } from '../redux/slices/authSlice'
const Navbar = () => {
const dispatch = useDispatch()
  const handleLogout = async() =>{
    try{
     const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,{
       credentials:'include'
     })
     const data = await res.json()
     if(data.success){
       dispatch(setUser(null))
       toast.success(data.message)
     }
    }catch(error){
     console.log(error)
    }
   }

  return (
    <div className='fixed top-0 bg-white z-10 w-full left-0   flex items-center  px-5 justify-between   py-2 border-b'>
      <div>
      <h2 className='text-3xl text-orange-500 font-bold'>MealMate.</h2>
      <span>Admin Panel</span>
      </div>
     <button className='py-2 px-4 border rounded-full hover:bg-orange-500 hover:text-white' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar
