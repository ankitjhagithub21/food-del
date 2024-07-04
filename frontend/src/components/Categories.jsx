import React from 'react'
import useFetchCategory from '../hooks/useFetchCategory'
import Category from './Category'

const Categories = () => {
    const categories = useFetchCategory()
  return (
    <div>
        <h2 className='mt-5 font-bold text-xl'>Popular Cuisines</h2>
       <div className='flex gap-5 overflow-x-auto items-center menu py-5'>
        {
            categories && categories.map((category)=>{
                return <Category key={category.idCateogy} category={category}/>
            })
        }
       </div>
    </div>
  )
}

export default Categories
