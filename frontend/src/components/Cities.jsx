import React from 'react'

const Cities = () => {
    const data = [
        {
            title:"Mahrana Pratap Nagar",
            desc:"451 places"
        }, {
            title:"TT Nagar",
            desc:"313 places"
        },
        {
            title:"Arera Colony",
            desc:"268 places"
        },
        {
            title:"Gulmohar Colony",
            desc:"325 places"
        },
        {
            title:"Kohefiza",
            desc:"187 places"
        },
        {
            title:"Peer Gate Area",
            desc:"200 places"
        },
    ]
  return (
    <div className='container mx-auto py-12 md:p-0 p-3'>
      <h1 className='text-3xl font-semibold mb-10'>Popular localities in and around Bhopal</h1>
  <div className='flex flex-wrap'>
  {
        data.map((city,index)=>{
            return <div key={index} className='lg:w-1/3 md:w-1/2 w-full p-3 cursor-pointer'>
                <div className='border p-2 rounded-lg hover:shadow-lg'>
                    <h2 className='text-2xl'>{city.title}</h2>
                    <p>{city.desc}</p>
                </div>
            </div>
        })
      }
  </div>
    </div>
  )
}

export default Cities
