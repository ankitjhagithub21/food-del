import React from 'react'

const Events = () => {
    const events = [
        {
            image:"/event1.avif",
            title:"Order online",
            desc:"Stay home and order to your doorstep"
        },
        {
            image:"/event2.avif",
            title:"Dining",
            desc:"View the city's favourite dining venues"
        },
        {
            image:"/event3.avif",
            title:"Nightlife and clubs",
            desc:"Explore the city's top nightlife outlets"
        },
    ]
  return (
    <div className='container mx-auto p-5 md:p-0 flex flex-wrap justify-between '>
        {
            events.map((event,idx)=>{
                return <div className='lg:w-[32%] md:w-[48%] w-full cursor-pointer hover-div my-4' key={idx}>
                    <div className='rounded-xl  border '>
                     
                       <img src={event.image} alt="thumbnail" loading='lazy' className='w-full h-44 rounded-t-xl object-cover object-center' />
                       
                       <div className='p-2'>
                       <h2 className='text-2xl my-2'>{event.title}</h2>
                       <p>{event.desc}</p>
                       </div>
                    </div>
                </div>
            })
        }
    </div>
  )
}

export default Events
