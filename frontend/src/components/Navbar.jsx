import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { CiSearch, CiUser, CiMenuFries } from "react-icons/ci"
import { useState } from 'react';
import { setShowLogin, setUser } from '../redux/slices/authSlice';
import toast from "react-hot-toast"

const Navbar = () => {
  const links = ["home", "menu", "services", "contact"];
  const location = useLocation()
  const activeLink = location.pathname.slice(1)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [showProfile, setShowProfile] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
        credentials: 'include'
      })
      const data = await res.json()
      if (data.success) {
        dispatch(setUser(null))
        toast.success(data.message)

      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <header>
      <nav className='container mx-auto  flex items-center justify-between py-3'>

        <Link className='text-orange-500 text-2xl font-bold z-50' to={"/"}>MealMate.</Link>
        <ul className='md:flex hidden space-x-4  '>
          {
            links.map((link, idx) => (
              <li key={idx}>
                <Link to={`/${link}`} className={` ${link === activeLink ? 'border-b border-b-orange-500' : 'hover:border-b'} `}>{link}</Link>
              </li>
            ))
          }
        </ul>

        <div className='flex items-center gap-2 relative md:mr-0 mr-5'>
          <Link to={"/search"}> <CiSearch size={22} /></Link>
          {
            user ? <CiUser size={27} className='cursor-pointer border p-1 rounded-full' onClick={() => setShowProfile(!showProfile)} /> : <button className='px-2 text-sm py-1 border hover:bg-orange-500 hover:text-white rounded-full' onClick={() => dispatch(setShowLogin(true))}>sign in</button>
          }
          {
            user && showProfile && <div className=' absolute flex flex-col gap-1 w-36 top-8 shadow-lg border right-1   px-4 py-2 bg-white rounded-lg'>
              <Link to={"/myorders"} className='hover:bg-red-200 rounded-lg p-1' onClick={() => setShowProfile(false)}>My Orders</Link>
              <hr className='mb-1' />
              <Link to={"/cart"} className='hover:bg-red-200 rounded-lg p-1' onClick={() => setShowProfile(false)}>Cart</Link>
              <hr className='mb-1' />
              <button className='bg-red-500 text-white py-1 rounded-lg' onClick={() => {
                setShowProfile(false)
                handleLogout()

              }}>
                Logout
              </button>
            </div>
          }
        </div>
        <ul className={`md:hidden fixed top-0 ${showNav ? 'left-0' : '-left-full'} transition-all duration-500 w-full h-screen flex flex-col bg-white gap-3 text-xl z-50 items-center justify-center  `}>
          {
            links.map((link, idx) => (
              <li key={idx}>
                <Link to={`/${link}`} className={` ${link === activeLink ? 'border-b border-b-orange-500' : 'hover:border-b'} `} onClick={() => setShowNav(false)}>{link}</Link>
              </li>

            ))
          }
          {
            user ? <button onClick={() => {
              setShowNav(false)
              handleLogout()

            }}>Logout</button> : <button onClick={() => {
              setShowNav(false)
              dispatch(setShowLogin(true))
            }}>Login</button>
          }
        </ul>

        <button className='md:hidden block absolute right-1 z-50' onClick={() => setShowNav(!showNav)}>
          <CiMenuFries size={20} />
        </button>

      </nav>
    </header>
  )
}

export default Navbar
