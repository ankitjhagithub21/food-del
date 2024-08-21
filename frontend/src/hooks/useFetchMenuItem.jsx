import {useDispatch} from "react-redux"
import { setAllFood } from "../redux/slices/foodSlice";
import { useState ,useEffect} from "react";

const useFetchMenuItem = () => {
    const [loading,setLoading] = useState(true)
    const dispatch = useDispatch()
    const fetchFoods = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/food/list`);
          const data = await res.json();
  
          if (data.success) {
            dispatch(setAllFood(data.foods));
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error fetching food list:", error);
        } finally {
          setLoading(false);
        }
      };
    useEffect(() => {
    
        fetchFoods();
      }, []);
      return loading
}

export default useFetchMenuItem
