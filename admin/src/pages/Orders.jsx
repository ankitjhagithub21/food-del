import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
const Orders = () => {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/order/all`, {
          credentials: 'include',
        })
        const data = await res.json()
        if (data.success) {
          setOrders(data.orders)
          
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/order/update/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        )
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className='flex flex-col w-full p-5'>
      {orders.map(order => (
        <div key={order._id} className='flex justify-between flex-wrap gap-2 items-center p-3 border my-3 w-full rounded-lg'>
          <div className='flex flex-col'>
            <h2>Order Details</h2>
            <span>Name: {order.address.firstName} {order.address.lastName}</span>
            <span>Email: {order.address.email}</span>
            <span>City: {order.address.city}</span>
            <span>State: {order.address.state}</span>
            <span>Zipcode: {order.address.zipcode}</span>
            <span>Country: {order.address.country}</span>
            <span>Phone: {order.address.phone}</span>
          </div>
          <div className='flex flex-col'>
            <h2>Items</h2>
            {order.items.map((item, index) => (
              <div key={index}>{item.food.name} x {item.quantity}</div>
            ))}
          </div>
          <span>Amount: ₹{order.amount}</span>
          <select
            name="status"
            id="status"
            className='cursor-pointer'
            value={order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
          >
            <option value={order.status}>{order.status}</option>
            <option value="Food Delivered">Food Delivered</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Order Cancel">Order Cancel</option>
          </select>
          <span>Payment: {order.payment ? 'True' : 'False'}</span>
          <span>Date: {order.date.slice(0, 10)}</span>
        </div>
      ))}
    </div>
  )
}

export default Orders
