import React, { useEffect, useState } from 'react'
import EmptyCart from '../components/EmptyCart'
import CartItem from '../components/CartItem'
import Loader from "../components/Loader"

const Cart = () => {

  const [loading, setLoading] = useState(true)
  const [items,setItems] = useState([])
  const fetchCart = async () => {
    try {

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart`, {
        credentials: 'include'
      });

      const data = await res.json();
      if (data.success) {

        setItems(data.cart)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };


  useEffect(() => {

    
    fetchCart()


  }, [])

  if (loading) {
    return <Loader />
  }
  if (items.length == 0) {
    return <EmptyCart />
  }
  return (
    <div className='container my-5 mx-auto px-5'>
      <h2 className='text-3xl font-bold mb-10 text-center'>Your cart</h2>
      <div className='flex flex-col'>

        {
          items.map((item) => {
            return <CartItem key={item._id} item={item} fetchCart={fetchCart} />
          })
        }
      </div>
    </div>
  )
}

export default Cart
