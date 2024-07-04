import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"

const CategoryBox = ({item}) => {
    const navigate = useNavigate()
    const category = useSelector(state=>state.food.category)
    return (
        <div className="p-4 lg:w-1/3 md:w-1/2 w-full"  onClick={() => navigate(`/meal/${item.idMeal}`)}>
            <div className="h-full  rounded-lg overflow-hidden cursor-pointer hover-div hover:shadow-lg">
                <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center rounded-lg"
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    loading='lazy'
                />
                <div className="p-2">
                    <h2 className="text-gray-600">
                        {category}
                    </h2>

                    <h1 className="text-lg font-medium  mb-3">
                        {item.strMeal}
                    </h1>


                </div>
            </div>
        </div>
    )
}

export default CategoryBox
