import React, { useEffect, useState } from 'react';
import {useSelector,useDispatch} from "react-redux"
import { setAllFood } from '../redux/slices/foodSlice';
import FoodItem from '../components/FoodItem';
const ListFood = () => {
  const foods = useSelector(state=>state.food.value)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/food/list`);
        const data = await res.json();

        if (data.success) {
          dispatch(setAllFood(data.foods));
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching food list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto p-5'>
    <h2 className='text-2xl font-bold mb-5'>Food List</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {foods.map((food) => (
       <FoodItem key={food._id} food={food}/>
      ))}
    </div>
  </div>
  );
};

export default ListFood;
