import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"

const CategoryBox = ({item}) => {
    const navigate = useNavigate()
    const category = useSelector(state=>state.food.category)
    return (
        <div className="lg:w-1/4 p-2 w-1/2 view my-4"  onClick={() => navigate(`/meal/${item.idMeal}`)}>
            <div className="overflow-hidden cursor-pointer rounded-lg">
                <img
                    className="w-full rounded-lg hover:scale-105"
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    loading='lazy'
                />
                <div className="p-2">
                    <h2 className="text-gray-600">
                        {category}
                    </h2>

                    <h1 className="text-lg font-medium hidden md:block  mb-3">
                        {item.strMeal}
                    </h1>


                </div>
            </div>
        </div>
    )
}

export default CategoryBox
