import React from 'react'
import { useSelector } from 'react-redux'



const CartSummary = () => {
    const items = useSelector(state=>state.cart.items)
    const subtotal = items.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
    
    return (
        <div className='lg:w-1/2 w-full flex flex-col gap-2 p-3 rounded-lg'>
            <h2 className='text-2xl font-semibold mb-2'>Cart Summary</h2>
            <div className='flex items-center w-full justify-between border-b pb-2'>
                <span>Sub Total</span>
                <span>₹ {subtotal}</span>
            </div>
            <div className='flex items-center w-full justify-between border-b pb-2'>
                <span>Delivery Charges</span>
                <span>₹ 0</span>
            </div>
            <div className='flex items-center w-full justify-between border-b pb-2'>
                <span>Total</span>
                <span>₹ {subtotal}</span>
            </div>

          



        </div>
    )
}

export default CartSummary
