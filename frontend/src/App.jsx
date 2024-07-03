import React from 'react'
import { BrowserRouter, Routes,Route } from "react-router-dom"
import Home from './pages/Home'
import Cart from './pages/Cart'
import Services from './pages/Services'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import "./App.css"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Menu from './pages/Menu'
import Search from './pages/Search'
import { useSelector } from 'react-redux'
import Login from './components/Login'
import Loader from './components/Loader'
import {Toaster} from 'react-hot-toast'
import useFetchUser from './hooks/useFetchUser'




const App = () => {
  const {showLogin,user,loading} = useSelector(state=>state.auth)
  
  useFetchUser()
  return (
 <>
    {
      loading ? <Loader/> : <BrowserRouter>
      <Toaster/>
        <Navbar />
        {!user && showLogin && <Login/>}
        <div className='md:w-[90%] w-[95%] mx-auto'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/*' element={<NotFound/>}/>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    }
 
 </>
  )
}

export default App
