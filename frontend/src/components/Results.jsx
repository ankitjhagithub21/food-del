import React from 'react'
import CategoryBox from './CategoryBox'
import useFetchOneCategory from '../hooks/useFetchOneCategory'
import Loader from './Loader'

import FoodNotFound from './FoodNotFound'
import { useSelector } from 'react-redux'
const Results = () => {
    const { items, loading } = useFetchOneCategory()
    const {category} = useSelector(state=>state.food)

    if (loading) {
        return <Loader />
    }
    if (!items) {
        return <FoodNotFound />

    }
    return (
        <section className='py-12'>
            <h1 className='text-center text-3xl font-bold mb-5'>{category}</h1>
            <div className="container mx-auto px-5 md:px-0">

                <div className="flex flex-wrap">
                    {
                        items.map((item) => {
                            return <CategoryBox key={item.idMeal} item={item} />
                        })
                    }

                </div>
            </div>
        </section>
    )
}

export default Results
