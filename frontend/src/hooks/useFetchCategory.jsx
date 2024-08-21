import { useEffect, useState } from "react"


const useFetchCategory = () => {
   
  
   const [categories,setCategories] = useState([])
   
    useEffect(()=>{
      const fetchCategory = async() =>{
         try{
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
            const data = await res.json()
            const updatedCategory = data.categories.map((category) => {
               return {
                   idCategory: category.idCategory,
                   strCategory: category.strCategory,
                   strCategoryThumb: category.strCategoryThumb
               };
           });
           setCategories(updatedCategory)
         }catch(error){
            console.log(error)
         }
      }
      fetchCategory()
    },[])
    return categories    
}

export default useFetchCategory
