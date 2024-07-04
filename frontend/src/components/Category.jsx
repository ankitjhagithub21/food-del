import React from 'react'

const Category = ({category}) => {
    return (
        <div className='text-center cursor-pointer hover-div   '>
            <div className='w-20 h-16 overflow-hidden bg-gray-100 rounded-full flex items-center justify-center'>
                <img src={category.strCategoryThumb} alt="food" className='w-full h-full object-cover object-center ' />
            </div>
            <span className='text-sm'>{category.strCategory}</span>
        </div>
    )
}

export default Category
