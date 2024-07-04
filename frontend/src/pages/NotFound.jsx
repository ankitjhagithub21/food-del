import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='p-5'>
      <div className='container mx-auto p-5 flex flex-wrap my-10 rounded-lg bg-white shadow-xl'>
        <div className='lg:w-1/2 w-full'>
          <img src="/notfound.avif" alt="not-found" />
        </div>
        <div className='lg:w-1/2 w-full mt-5 lg:mt-0 flex flex-col text-center items-center justify-center gap-3'>
          <p>This is a 404 page and we think it's fairly clear
            You aren't going to find what you're looking for here
            But we know you're hungry, so don't fret or rage
            Hit that big red button to go back to our homepage</p>
          <Link className='bg-orange-500 text-white px-4 py-2 rounded-lg' to={"/"}>BACK TO HOME</Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound
