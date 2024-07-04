import React, { useEffect, useState} from 'react';
import EmptyCart from '../components/EmptyCart';
import CartItem from '../components/CartItem';
import Loader from "../components/Loader";
import CartSummary from '../components/CartSummary';
import { useDispatch } from 'react-redux';
import { setTotal } from '../redux/slices/foodSlice';

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);
 

const dispatch = useDispatch()
  const fetchCart = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
      
        setItems(data.cart.foods);
       
        const subtotal = data.cart.foods.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
        dispatch(setTotal(subtotal))
      } 
    } catch (error) {
      
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }



  return (
    <div className="container my-5 mx-auto px-5">
      <h2 className="text-3xl font-bold mb-10 text-center">Your cart</h2>
      <div className="flex flex-wrap">
        {items && items.map((item) => (
          <CartItem key={item._id} item={item} fetchCart={fetchCart} />
        ))}
      </div>
      {
        items.length > 0 && <div className="flex flex-wrap-reverse gap-5 md:gap-0 mt-5">
          <CartSummary />
          <div className="w-full lg:w-1/2 flex items-center justify-center px-5">
            <div className="w-full">
              <p className="mb-2 lg:px-5">If you have a promo code, enter it here</p>
              <div className="flex lg:px-5">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="px-4 py-2 w-full bg-gray-100"
                />
                <button className="px-2 py-2 bg-gray-800 text-white">Submit</button>
              </div>
            </div>
          </div>

        </div>
      }
    </div>
  );
};

export default Cart;
