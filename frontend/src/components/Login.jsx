import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrState, setShowLogin, setUser } from '../redux/slices/authSlice'
import { IoMdClose } from "react-icons/io";
import {FaEye,FaEyeSlash} from "react-icons/fa"
import toast from 'react-hot-toast';




const Login = () => {
    const initialState = {
        fullName: "",
        email: "",
        password: "",
    }
    const [loading, setLoading] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const [userData, setUserData] = useState(initialState)
    const { currState } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(loading) return;
        
        const endPoint = currState === "Login" ? 'login' :'register'
        let url = `${import.meta.env.VITE_SERVER_URL}/api/auth/${endPoint}`
        try{
            setLoading(true)
            const res = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify(userData)
            })
            const data = await res.json()

            if(data.success){
                setLoading(false)
                toast.success(data.message)
                setUserData(initialState)
                dispatch(setShowLogin(false))
                 dispatch(setUser(data.user))
            }else{
              setLoading(false)
              toast.error(data.message)  
            }
          
        }catch(error){
            console.log(error)
            
            toast.error("Something went wrong.")
        }finally{
            setLoading(false)
        }
        
    }
    return (
        <div className='h-screen w-full fixed flex items-center px-5 justify-center z-50 top-0 left-0 backdrop-blur-md'>
           
            <div className='lg:w-1/3 mx-auto w-full p-5 rounded-lg bg-white shadow-lg'>
              <div className='flex items-center justify-between mb-5'>
              <h2 className='text-2xl font-bold '>{currState}</h2>
                <button onClick={()=>dispatch(setShowLogin(false))}>
                <IoMdClose size={20}/>
            </button>
              </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    {
                        currState !== "Login" && <input type="text" placeholder='Your name' name='fullName' value={userData.fullName} onChange={handleChange} className='px-4 rounded-lg py-2 border' required />
                    }
                    <input type="email" placeholder='Your email' name='email' value={userData.email} onChange={handleChange} className='px-4 py-2 border rounded-lg' required />
                   <div className='relative'>
                   <input type={showPassword ? 'text':'password'} placeholder='Your password' name='password' value={userData.password} onChange={handleChange} className='px-4 py-2 border w-full rounded-lg' required />
                   <div className='absolute top-3 right-2' onClick={()=>setShowPassword(!showPassword)}>
                     {
                        showPassword ? <FaEyeSlash/> : <FaEye/>
                     }
                   </div>
                   </div>
                    <button type='submit' className='px-4 py-2  bg-orange-500 hover:bg-orange-600 rounded-lg text-white'>{loading ? 'Loading...' : currState}</button>
                    {
                        currState == "Login" ? <p>Create a new account ? <button type='button' className='text-orange-500' onClick={() => dispatch(setCurrState('Sign Up'))}>Click here</button></p> : <p>Already have an account ? <button type='button' className='text-orange-500' onClick={() => dispatch(setCurrState("Login"))}>Login</button></p>
                    }
                </form>
               <div className='text-center'>
               <p className='mb-2'>or</p>
               <button onClick={()=>{
                dispatch(setCurrState('Login'))
                setUserData({
                    email:"test@gmail.com",
                    password:"123456"
                })
               }} className='bg-orange-500 text-white px-4 py-1 rounded-lg'>Use Demo Account</button>
               </div>
            </div>
          
        </div>
    )
}

export default Login
