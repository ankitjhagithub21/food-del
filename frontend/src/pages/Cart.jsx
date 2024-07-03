import React, { useEffect } from 'react'
import EmptyCart from '../components/EmptyCart'
import useFetchCart from '../hooks/useFetchCart'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem'
import Loader from "../components/Loader"
const Cart = () => {
   const loading = useFetchCart()
   const cartItems = useSelector(state=>state.cart.value)
  if(loading){
    return <Loader/>
  }
   if(!cartItems || cartItems.length==0){
    return <EmptyCart/>
   }
  return (
    <div className='container my-5 mx-auto px-5'>
      <h2 className='text-3xl font-bold mb-10 text-center'>Your cart</h2>
      <div className='flex flex-col'>
          
           {
            cartItems.map((item)=>{
              return <CartItem key={item._id} item={item}/>
            })
           }
     </div>
    </div>
  )
}

export default Cart
