import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import { Toaster } from 'react-hot-toast'
import useFetchUser from './hooks/useFetchUser'
import FoodDetails from './pages/FoodDetails'
import MealDetails from './pages/MealDetails'
import Order from './components/Order'





const App = () => {
  const { showLogin, user } = useSelector(state => state.auth)

  useFetchUser()

  return (
    <>

      <BrowserRouter>
        <Toaster />
        <Navbar />
        {!user && showLogin && <Login />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cart' element={user ? <Cart /> : <Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/food/:id' element={<FoodDetails />} />
          <Route path='/meal/:id' element={<MealDetails />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/search' element={<Search />} />
          <Route path='/order' element={<Order />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>


    </>
  )
}

export default App
