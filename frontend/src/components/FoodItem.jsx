import React from 'react';
import {CiStar} from "react-icons/ci"
import { useNavigate } from 'react-router-dom';
const FoodItem = ({ food}) => {
   
  const navigate = useNavigate()
  return (
    
     <div className='cursor-pointer hover-div p-5' onClick={()=>{
      navigate(`/food/${food._id}`)
      window.scroll(0,0)
     }}>
     <img
        src={food.image.url}
        alt={food.name}
        className='w-full h-48 object-cover rounded-t-lg'
      />
      <div className='p-4 shadow rounded-lg'>
         <span className='text-gray-600 text-sm'>{food.category}</span>
        <div className='flex justify-between items-center mb-2'>
        <h3 className='text-xl font-bold'>{food.name}</h3>
        <div className='bg-green-600 text-white text-sm px-2 py-1 flex items-center  gap-0.5 rounded-lg'>
                  <CiStar size={20}/> <span>4.1</span>
        </div>
        </div>
        <p className='text-gray-600'>{food.description.slice(0,130)}.</p>
        <p className='text-orange-500 mt-2'>₹ {food.price}</p>
       
      </div>
     </div>
   
  );
};

export default FoodItem;
