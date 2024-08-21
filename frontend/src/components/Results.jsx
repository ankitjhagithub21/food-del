import React from 'react'
import CategoryBox from './CategoryBox'
import useFetchOneCategory from '../hooks/useFetchOneCategory'
import Loader from './Loader'
const Results = () => {
    const items = useFetchOneCategory()
    
    if(!items || items.length==0){
        return <Loader/>

    }
    return (
        <div className="container py-12 mx-auto px-5 md:px-0">

            <div className="flex flex-wrap">
                {
                    items.map((item) => {
                        return <CategoryBox key={item.idMeal} item={item}  />
                    })
                }

            </div>
        </div>
    )
}

export default Results
