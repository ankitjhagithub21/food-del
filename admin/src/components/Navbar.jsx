import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-5 py-2 border-b'>
      <div>
      <h2 className='text-3xl text-orange-500 font-bold'>Food.</h2>
      <span>Admin Panel</span>
      </div>
      <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className='w-10 rounded-full' />
    </div>
  )
}

export default Navbar
