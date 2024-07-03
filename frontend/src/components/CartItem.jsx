import React from 'react'
import { useDispatch } from 'react-redux'
import { setCart } from '../redux/slices/cartSlice'

const CartItem = ({ item }) => {
    const dispatch = useDispatch()
    const handleRemove = async() =>{
        try{
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/remove/${item._id}`,{
                    method:"DELETE",
                    credentials:'include'
                })
                const data = await res.json()
                if(data.success){
                        dispatch(setCart(data.cart.foods))
                }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div key={item._id} className='flex items-center justify-between'>
            <img src={item.food.image.url} alt={item.food.name} className='w-24 h-24 rounded-lg object-contain object-center' />
            <h2> {item.food.name}</h2>
            <p>${item.food.price * item.quantity}</p>
            <p>{item.quantity}</p>
            <button className='bg-red-500 text-white px-2 py-0.5 rounded-lg text-lg'onClick={handleRemove}>X</button>
        </div>
    )
}

export default CartItem
