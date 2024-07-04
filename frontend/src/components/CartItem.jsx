import React from 'react'
import { IoMdClose } from 'react-icons/io'


const CartItem = ({ item, fetchCart }) => {


    const handleRemove = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/remove/${item.food._id}`, {
                method: "DELETE",
                credentials: 'include'
            })
            const data = await res.json()
            if (data.success) {
                fetchCart()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div key={item._id} className='lg:w-1/2 w-full '>
            <div className='flex  gap-2 items-center border p-2 rounded-lg my-2 relative'>
                <img src={item.food.image.url} alt={item.name} className='w-24 h-24 rounded-lg object-contain object-center' />
                <div className='flex flex-col items-start'>
                    <h2> {item.food.name}</h2>
                    <p>Price : ₹ {item.food.price * item.quantity}</p>
                    <p>Quantity : {item.quantity}</p>
                    <button className='absolute top-2 right-2' onClick={handleRemove}>
                        <IoMdClose />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
