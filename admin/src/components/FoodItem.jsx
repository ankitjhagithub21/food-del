import React from 'react';
import toast from 'react-hot-toast';
import {useDispatch} from "react-redux"
import { removeFood } from '../redux/slices/foodSlice';
const FoodItem = ({ food}) => {
  const dispatch = useDispatch()
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${food.name}?`)) {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/food/remove/${food._id}`, {
          method: 'DELETE',
          credentials:'include'
        });
        const data = await res.json();
        
        if (data.success) {
          toast.success(data.message);-
          dispatch(removeFood(food._id))
          
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Error deleting food item:', error);
        toast.error('Failed to delete food item. Please try again.');
      }
    }
  };

  return (
    <div className='border rounded-lg p-4 shadow-md relative my-2'>
      <img
        src={food.image.url}
        alt={food.name}
        className='w-full h-36 object-cover rounded-t-lg'
        loading='lazy'
      />
      <div className='p-4 '>
        <h3 className='text-xl font-bold'>{food.name}</h3>
        <p className='text-gray-600'>{food.description}</p>
        <p className='text-orange-500 mt-2'>₹ {food.price}</p>
        <button
          onClick={handleDelete}
          className='px-2 py-1 bg-red-500 hover:bg-red-600 tesxt-sm absolute -top-1 right-2 rounded-lg text-white mt-2'
        >
          X
        </button>
      </div>
    </div>
  );
};

export default FoodItem;
