import React from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from "react-router-dom"
import AddFood from './pages/AddFood'
import ListFood from './pages/ListFood'
import Orders from './pages/Orders'
import Messages from './pages/Messages'
import Login from './pages/Login'
import {useSelector} from "react-redux"
import {Toaster} from "react-hot-toast"
import useFetchUser from './hooks/useFetchUser'
const App = () => {
   const user = useSelector((state)=>state.auth.user)
   useFetchUser()
  return (
   <>
   <Toaster/>
   {
     user && user.isAdmin ?  <>
    
     <Navbar />
     <div className='flex h-screen w-full pt-20'>
       <Sidebar />
 
       <Routes>
 
         <Route path='/' element={<AddFood />} />
         <Route path='/list' element={<ListFood />} />
         <Route path='/orders' element={<Orders />} />
         <Route path='/messages' element={<Messages />} />
        
       </Routes>
     </div>
 
   </>: <Login/>
   }
   </>
  )
}

export default App
