import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';

const useFetchUser = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  useEffect(() => {

    const getUserFromServer = async () => {
      try {
       
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`, {
          credentials: 'include'
        });

        const data = await res.json();
        if (data.success) {
          dispatch(setUser(data.user));
         
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        console.error(error);
      } 
    };

    if (!user) {
      getUserFromServer()
    } 


  }, [])
}

export default useFetchUser
