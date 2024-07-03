import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'

const FoodDetails = () => {
  const {id} = useParams()
  const [food,setFood] = useState(null)
  useEffect(()=>{
    const fetchFood = async() =>{
      try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/food/${id}`)
        const data = await res.json()
       if(data.success){
         setFood(data.food)
       }
      }catch(error){
        console.log(error)
      }
    }
    fetchFood()
  },[id])

  if(!food){
    return <Loader/>
  }
  return (
    <div className='container flex flex-wrap px-5 my-10 items-center'>
      <div className='lg:w-1/2 w-full'>
        <img src={food.image.url} alt="food" className='md:w-1/2 mx-auto w-full rounded-lg'/>
      </div>
      <div className='lg:w-1/2 w-full flex flex-col gap-3 mt-5 lg:mt-0 items-start'>
        <h2 className='text-3xl font-bold'>{food.name}</h2>
        <p className='text-xl'>{food.description}</p>
        <b>₹ {food.price}</b>
        <button className='px-4 py-2 bg-green-500 text-white rounded-lg'>ADD TO CART</button>
      </div>
    </div>
  )
}

export default FoodDetails
