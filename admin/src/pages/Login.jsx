import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { setUser } from '../redux/slices/authSlice'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()


    const handleSubmit = async (e) => {
        e.preventDefault()


        try {
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({email,password})
            })
            const data = await res.json()

            if (data.success) {
                setLoading(false)
                if(data.user.isAdmin){
                    dispatch(setUser(data.user))
                    toast.success(data.message)
                }else{
                    toast.error("You are not admin.")
                }


            } else {
                setLoading(false)
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    return (
        <div className='h-screen w-full flex flex-col gap-5 items-center p-5 justify-center fixed top-0 left-0 backdrop-blur-md'>
            <h2 className='text-2xl'>Admin Login Page</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 lg:w-1/3 md:w-1/2 w-full'>

                <input type="email" placeholder='Your email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='px-4 py-2 border rounded-lg' required />
                <input type="password" placeholder='Your password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='px-4 py-2 border rounded-lg' required />
                <button type='submit' className='px-4 py-2  bg-orange-500 hover:bg-orange-600 rounded-lg text-white'>{loading ? 'Loading...' : 'Login'}</button>

            </form>
        </div>
    )
}

export default Login
