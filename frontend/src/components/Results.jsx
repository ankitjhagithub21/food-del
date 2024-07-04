import React from 'react'
import CategoryBox from './CategoryBox'
import useFetchOneCategory from '../hooks/useFetchOneCategory'
const Results = () => {
    const items = useFetchOneCategory()
    if(!items || items.length==0){
        return <p>Not found.</p>
    }
    return (
        <div className="container px-5 py-12 mx-auto">

            <div className="flex flex-wrap">
                {
                    items.map((item) => {
                        return <CategoryBox key={item.idCategory} item={item}  />
                    })
                }

            </div>
        </div>
    )
}

export default Results
