import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const useFetchOneCategory = () => {
   const category = useSelector(state=>state.food.category)
   const [items,setItems] = useState([])
   
    useEffect(()=>{
      const fetchCategory = async() =>{
         try{
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await res.json()
            setItems(data.meals)
         }catch(error){
            console.log(error)
         }
      }
      fetchCategory()
    },[category])
    return items
}

export default useFetchOneCategory