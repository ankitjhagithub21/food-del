import React from 'react'
import { useDispatch } from "react-redux"
import {setCategory} from "../redux/slices/foodSlice"

const Category = ({ category }) => {
    const dispatch = useDispatch()

    return (
        <div className="text-center my-2 rounded-lg category shadow p-3" onClick={()=>dispatch(setCategory(category.strCategory))}>
        <img
          src={category.strCategoryThumb}
          alt={category.strCategory}
          loading="lazy"
        />
        <h2 className="font-medium text-lg">{category.strCategory}</h2>
      </div>
    )
}

export default Category
