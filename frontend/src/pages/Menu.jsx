import {useSelector,useDispatch} from "react-redux"
import FoodItem from '../components/FoodItem';
import Loader from '../components/Loader';
import useFetchMenuItem from '../hooks/useFetchMenuItem';

const Menu = () => {
  const foods = useSelector(state=>state.food.value)

  const loading = useFetchMenuItem()

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className='container mx-auto my-12'>
    <h2 className='text-3xl font-bold mb-8 text-center '>Our Menu</h2>
    
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {foods.map((food) => (
       <FoodItem key={food._id} food={food}/>
      ))}
    </div>
  </div>
  );
};

export default Menu;
