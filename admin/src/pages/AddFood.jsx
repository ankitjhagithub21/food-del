import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {useDispatch} from  "react-redux"
import { addFood } from '../redux/slices/foodSlice';
import {useNavigate} from "react-router-dom"

const AddFood = () => {
    const initialState = {
        name: "",
        description: "",
        category: "",
        price: "",
        image: null
    };
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const [foodData, setFoodData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFoodData({ ...foodData, [name]: files[0] });
        } else {
            setFoodData({ ...foodData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', foodData.name);
        formData.append('description', foodData.description);
        formData.append('category', foodData.category);
        formData.append('price', foodData.price);
        formData.append('image', foodData.image);

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/food/add`, {
                method: "POST",
                credentials:'include',
                body: formData,
                
            });
            const data = await res.json();

            if (data.success) {
                toast.success(data.message);
                dispatch(addFood(data.food))
                setFoodData(initialState);
                navigate("/list")
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mx-auto p-5'>
           
           <div className='lg:w-2/3 mx-auto w-full'>
           <h2 className='text-2xl font-bold mb-5 text-center'>Add New Food</h2>
           <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
                <input
                    type='text'
                    name='name'
                    placeholder='Food Name'
                    value={foodData.name}
                    onChange={handleChange}
                    className='px-4 py-2 border rounded-lg'
                    required
                />
                <textarea
                    name='description'
                    placeholder='Description'
                    value={foodData.description}
                    onChange={handleChange}
                    className='px-4 py-2 border rounded-lg'
                    required
                />
                <input
                    type='text'
                    name='category'
                    placeholder='Category'
                    value={foodData.category}
                    onChange={handleChange}
                    className='px-4 py-2 border rounded-lg'
                    required
                />
                <input
                    type='number'
                    name='price'
                    placeholder='Price'
                    value={foodData.price}
                    onChange={handleChange}
                    className='px-4 py-2 border rounded-lg'
                    required
                />
                <input
                    type='file'
                    name='image'
                    accept='image/*'
                    onChange={handleChange}
                    className='px-4 py-2 border rounded-lg'
                    required
                />
                <button
                    type='submit'
                    className='px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white'
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Add Food'}
                </button>
            </form>
           </div>
        </div>
    );
};

export default AddFood;
