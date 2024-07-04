import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartSummary from './CartSummary'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'

const Order = () => {
  
  const cartItems = useSelector(state=>state.cart.items)
  
  const total = cartItems.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
  
  const initialData = {

    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  }
  const [formData, setFormData] = useState(initialData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let orderData = {
      items: cartItems,
      amount: total,
      address: formData,
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
        body: JSON.stringify(orderData)
      })
      const data = await res.json()
      if (data.success) {
       window.location.replace(data.url)

      }else{
      console.log(data.message)
        toast.error("Error.")
      }
    } catch (error) {
      console.log(error)
    }

  }
  if(total==0){
    return <Navigate to={"/"}/>
  }
  return (
    <div className='container py-24 mx-auto flex flex-wrap-reverse'>
      <div className="lg:w-1/2 w-full p-5">
        <h2 className='text-2xl mb-5 font-bold'>Delivery Information</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <div className='flex w-full gap-2'>
            <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} className='w-1/2 border px-4 py-2 rounded-lg' placeholder='First Name' required />
            <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} className='w-1/2 border px-4 py-2 rounded-lg' placeholder='Last Name' required />

          </div>

          <div className='flex w-full gap-2'>
            <input type="text" name='city' value={formData.city} onChange={handleChange} className='border w-1/2 px-4 py-2 rounded-lg' placeholder='Enter city' required />
            <input type="text" name='state' value={formData.state} onChange={handleChange} className='border w-1/2 px-4 py-2 rounded-lg' placeholder='Enter state' required />
          </div>
          <div className='flex w-full gap-2'>
            <input type="text" name='zipcode' value={formData.zipcode} onChange={handleChange} className='border w-1/2 px-4 py-2 rounded-lg' placeholder='Enter zipcode' required />
            <input type="text" name='country' value={formData.country} onChange={handleChange} className='border w-1/2 px-4 py-2 rounded-lg' placeholder='Enter country' required />
          </div>
          <input type="email" name='email' value={formData.email} onChange={handleChange} className='border px-4 py-2 rounded-lg' placeholder='Enter email' required />

          <input type="text" name='phone' value={formData.phone} onChange={handleChange} className='border px-4 py-2 rounded-lg' placeholder='Enter phone' required />
          <button className='px-4 py-2 text-white bg-orange-500 rounded-lg' type='submit'>PROCESS TO PAYMENT</button>
        </form>
      </div>
      <CartSummary />

    </div>

  )
}

export default Order