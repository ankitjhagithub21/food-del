import { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux';
import { setCart } from '../redux/slices/cartSlice';


const useFetchCart = () => {
  const dispatch = useDispatch()
 
 const [loading,setLoading] = useState(true)
  useEffect(() => {

    const fetchCart = async () => {
      try {
       
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart`, {
          credentials: 'include'
        });

        const data = await res.json();
        if (data.success) {
          dispatch(setCart(data.cart.foods));
         
        } 
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      } 
    };

    fetchCart()


  }, [])
  return loading
}

export default useFetchCart
