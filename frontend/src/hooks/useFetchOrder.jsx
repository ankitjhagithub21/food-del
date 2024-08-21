import { useState,useEffect } from 'react'

const useFetchOrder = () => {
    const [loading,setLoading] = useState(true)
    const [orders,setOrders] = useState([])
   
  useEffect(()=>{
    const fetchOrders = async() =>{
        try{
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/order/user`,{
               credentials:'include'
            })
            const data = await res.json()
         
            if(data.success){
                setOrders(data.orders)
                
            }
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
   
    fetchOrders()
  },[])
  return {
    loading,orders
  }
}

export default useFetchOrder
