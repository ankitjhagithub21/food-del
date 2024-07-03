import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {CiSearch, CiUser,CiMenuFries} from "react-icons/ci"
import { useState } from 'react';
import { setShowLogin, setUser } from '../redux/slices/authSlice';
import toast from "react-hot-toast"

const Navbar = () => {
  const links = ["home", "menu", "services", "contact"];
  
  const {user} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const [showProfile,setShowProfile] = useState(false)
  const [showNav,setShowNav] = useState(false)
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
    <nav className='md:w-[90%] w-[95%] mx-auto  flex items-center justify-between py-2'>
     
      <Link className='text-orange-500 text-2xl font-bold z-50' to={"/"}>Zomato.</Link>
      <ul className='md:flex hidden space-x-4  '>
        {
          links.map((link, idx) => (
            <li key={idx}>
              <Link to={`/${link}`}>{link}</Link>
            </li>
          ))
        }
      </ul>

     <div className='flex items-center gap-2 relative md:mr-0 mr-5'>
    <Link to={"/search"}> <CiSearch size={22} /></Link>
        {
          user ?  <CiUser size={27} className='cursor-pointer border p-1 rounded-full' onClick={()=>setShowProfile(!showProfile)}/> : <button className='px-4 text-sm py-2 border hover:bg-orange-500 hover:text-white rounded-full' onClick={()=>dispatch(setShowLogin(true))}>Sign in</button>
        }
        {
          user && showProfile && <div className=' absolute top-8 shadow-lg border right-1   px-4 py-2 bg-white rounded-lg'>
            <Link to={"/myorders"} className='inline-block'>Orders</Link>
            <hr className='mb-1'/>
            <Link to={"/cart"}>Cart</Link>
            <hr className='mb-1'/>
           <button onClick={()=>{
            setShowProfile(false)
            handleLogout()
            
           }}>
            Logout
           </button>
          </div>
        }
     </div>
     <ul className={`md:hidden fixed top-0 ${showNav ? 'left-0' :'-left-full'} transition-all duration-500 w-full h-screen flex flex-col bg-white gap-3 text-xl z-10 items-center justify-center  `}>
        {
          links.map((link, idx) => (
            <li key={idx}>
              <Link to={`/${link}`} onClick={()=>setShowNav(false)}>{link}</Link>
            </li>

          ))
        }
       {
         user ? <button onClick={()=>{
          setShowNav(false)
          handleLogout()

         }}>Logout</button> : <button onClick={()=>{
          setShowNav(false)
          dispatch(setShowLogin(true))
         }}>Login</button>
       }
      </ul>

     <button className='md:hidden block absolute right-1 z-50'onClick={()=>setShowNav(!showNav)}>
        <CiMenuFries size={20}/>
      </button>

    </nav>
  )
}

export default Navbar
