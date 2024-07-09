import React from 'react'


const Collections = () => {
    const images = [
       "r1","r2","r3","r4"
    ]
  return (
    <div className='container py-12 mx-auto px-5'>
     <h1 className='text-4xl font-semibold'>Collections</h1>
     <p className='text-xl font-light mb-5'>Explore curated lists of top restaurants, cafes, pubs, and bars in Bhopal, based on trends</p>
     <div className='flex flex-wrap'>
       {
        images.map((image,index)=>{
            return  <div key={index} className='lg:w-1/4 md:w-1/2 w-full p-3 hover-div cursor-pointer'>
              
               <img src={`/${image}.jpg`} alt="collecton" className='w-full md:h-96 h-80 object-cover object-center'/>
             
            </div>
        })
       }
     </div>
    </div>
  )
}

export default Collections
