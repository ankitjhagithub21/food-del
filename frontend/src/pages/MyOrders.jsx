import Loader from '../components/Loader'
import useFetchOrder from '../hooks/useFetchOrder'

const MyOrders = () => {
   const {loading,orders} = useFetchOrder()

    if(loading){
        return <Loader/>
    }
   

  return (
    <div className='container mx-auto px-5 py-12'>
        <h2 className='text-2xl font-bold mb-10'>My Orders</h2>
        {
            orders?.length === 0 && <p className='text-lg'>Your order list is empty.</p> 
        }
        <div className='flex flex-col gap-5'>
            {
                orders.map((order,index)=>{
                    return <div key={index} className='border p-3 flex flex-wrap gap-2 items-center justify-between'>
                     <div className='flex flex-col gap-1 lg:w-1/4 md:w-1/2 w-full '>
                       
                       {
                         order.items.map((item,index)=>{
                            return <span key={index}>{item.food.name} X {item.quantity}</span> 
                         })
                       }
                       
                     </div>
                     <div>
                        <span>Amount : ₹{order.amount}</span>
                     </div>
                     <div>
                        <span>Status: {order.status}</span>
                     </div>
                     <div>
                        <span>Date: {order.date.slice(0,10)}</span>
                     </div>
                    </div>
                }).reverse()
            }
        </div>
    </div>
  )
}

export default MyOrders