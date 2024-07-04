import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import Categories from '../components/Categories'

const Search = () => {
   
    const [query,setQuery] = useState('')
    
   const navigate = useNavigate()
    const handleSubmit = async(e) =>{
      e.preventDefault()
      try{
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const data = await res.json()
        if(data.meals){
          navigate(`/meal/${data.meals[0].idMeal}`)
        }else{
          toast.error("meal not found.")
        }
      }catch(error){
        console.log(error)
      }
    }
  return (
    <>
    <div className='container mx-auto p-5'>
     <div className='lg:w-2/3 w-full mx-auto'>
     <form className='flex items-center px-4 py-2 border' onSubmit={handleSubmit}>
        <input type="text" placeholder='Search food ' value={query} onChange={(e)=>setQuery(e.target.value)} className='w-full text-lg outline-none' required/>
        <button type='submit'><CiSearch size={30}/></button>
      </form>
     
      <Categories/>
      </div>
    </div>
   
    </>
  )
}

export default Search