import React from 'react'


const CartItem = ({ item,fetchCart }) => {
   
    
    const handleRemove = async() =>{
        try{
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/remove/${item._id}`,{
                    method:"DELETE",
                    credentials:'include'
                })
                const data = await res.json()
                if(data.success){
                    fetchCart()
                }
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div key={item._id} className='flex flex-wrap items-center gap-5 border p-2 m-2'>
            <img src={item.food.image.url} alt={item.food.name} className='w-24 h-24 rounded-lg object-contain object-center' />
            <h2> {item.food.name}</h2>
            <p>${item.food.price * item.quantity}</p>
            <p>{item.quantity}</p>
            <button className='bg-red-500 text-white px-2 py-0.5 rounded-lg text-lg'onClick={handleRemove}>X</button>
        </div>
    )
}

export default CartItem
