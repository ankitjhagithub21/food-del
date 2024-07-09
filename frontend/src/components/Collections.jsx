import React from 'react'


const Collections = () => {
    const collections = [
        {
            image:"/r1.jpg",
            title:"9 Great Cafes"

        },
        {
            image:"/r2.jpg",
            title:"9 Great Cafes"

        },
        {
            image:"/r3.jpg",
            title:"9 Great Cafes"

        },
        {
            image:"/r2.jpg",
            title:"9 Great Cafes"

        },
    ]
  return (
    <div className='container py-12 mx-auto px-5'>
     <h1 className='text-4xl font-semibold'>Collections</h1>
     <p className='text-xl font-light mb-5'>Explore curated lists of top restaurants, cafes, pubs, and bars in Bhopal, based on trends</p>
     <div className='flex flex-wrap'>
       {
        collections.map((collection,index)=>{
            return  <div key={index} className='lg:w-1/4 md:w-1/2 w-full p-3 hover-div'>
              
               <img src={collection.image} alt="collecton" className='w-full md:h-96 h-80 object-cover object-center'/>
             
            </div>
        })
       }
     </div>
    </div>
  )
}

export default Collections
