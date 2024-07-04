import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import toast from "react-hot-toast"
import Categories from '../components/Categories'
import useFetchCategory from '../hooks/useFetchCategory'
import { useDispatch } from 'react-redux'
import { setCategory } from '../redux/slices/foodSlice'

const Search = () => {
   
    const [query,setQuery] = useState('')
    
    const dispatch = useDispatch()
    const handleSubmit = (e) =>{
      e.preventDefault()
      
      dispatch(setCategory(query))
      setQuery('')
    }
  return (
    <>
    <div className='container mx-auto p-5'>
     <div className='lg:w-2/3 w-full mx-auto'>
     <form className='flex items-center px-4 py-2 border' onSubmit={handleSubmit}>
        <input type="text" placeholder='Search food ' value={query} onChange={(e)=>setQuery(e.target.value)} className='w-full text-lg outline-none' required/>
        <button type='submit'><CiSearch size={30}/></button>
      </form>
     
      
      </div>
    </div>
    <Categories/>
   
    </>
  )
}

export default Search