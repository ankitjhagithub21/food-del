import React from 'react'
import { useDispatch } from "react-redux"
import {setCategory} from "../redux/slices/foodSlice"

const Category = ({ category }) => {
    const dispatch = useDispatch()

    return (
        <div className='text-center cursor-pointer hover-div   ' onClick={() => dispatch(setCategory(category.strCategory))}>
            <div className='w-20 h-16 overflow-hidden bg-gray-100 rounded-full flex items-center justify-center'>
                <img src={category.strCategoryThumb} alt="food" className='w-full h-full object-cover object-center ' loading='lazy' />
            </div>
            <span>{category.strCategory}</span>
        </div>
    )
}

export default Category
