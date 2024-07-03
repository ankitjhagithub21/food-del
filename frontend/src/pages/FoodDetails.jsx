import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { CiShoppingCart } from "react-icons/ci";
import toast from "react-hot-toast"
import {useSelector} from "react-redux"

const FoodDetails = () => {
  const { id } = useParams()
  const [food, setFood] = useState(null)
  const user = useSelector(state=>state.auth.user)
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/food/${id}`)
        const data = await res.json()
        if (data.success) {
          setFood(data.food)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchFood()
  }, [id])

  const handleAddToCart = async () => {
    if(!user){
      return toast.error("You are not logged in.")
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ foodId: food._id, quantity })
      })

      const data = await res.json()
      if(data.success){
          toast.success(data.message)
          navigate("/cart")
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")
    }
  }

  if (!food) {
    return <Loader />
  }
  return (
    <div className='container flex flex-wrap px-5 my-10 items-center'>
      <div className='lg:w-1/2 w-full'>
        <img src={food.image.url} alt="food" className='md:w-1/2 mx-auto w-full rounded-lg' />
      </div>
      <div className='lg:w-1/2 w-full flex flex-col gap-3 mt-5 lg:mt-0 items-start'>
        <h2 className='text-3xl font-bold'>{food.name}</h2>
        <p className='text-lg font-semibold'>Price: ₹ {food.price * quantity}</p>
        <p className='text-xl'>{food.description}</p>
        
       
          <div className='flex items-center gap-3'>
            <button className='px-2 py-0.5 bg-red-500 text-white rounded-lg' onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : prev)}>-</button>
            <span className='text-xl'>{quantity}</span>
            <button className='px-2 py-0.5 bg-green-500 text-white rounded-lg' onClick={() => setQuantity(prev => prev + 1)}>+</button>
          </div>
        
       
        <button onClick={handleAddToCart} className='bg-green-500 text-white w-full mt-3 rounded-lg p-2' >
            ADD TO CART
          </button>
      </div>
    </div>
  )
}

export default FoodDetails
