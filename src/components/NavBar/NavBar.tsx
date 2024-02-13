import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useHeaderContext from '../../hooks/useHeaderContext';
import { logoutApi } from '../../api/auth';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import useTaskContext from '../../hooks/useTaskContext';

const NavBar = () => {
  const { user, setUser, setToken } = useAuthContext()
  const [imageLoad, setImageLoad] = useState<Boolean>(false)
  const { setActive } = useHeaderContext()
  const navigate = useNavigate()
  const { dispatch } = useTaskContext()

  const handleImageLoad = () => {
    setImageLoad(true)
  }

  const handleLogout = async () => {
    try {
      await logoutApi()
      setUser({ id: "", fullName: '', email: '', avatar: '' })
      setToken('')
      Cookies.remove('bast-tok');
      dispatch({ type: "SET_TASKS", payload: [] });
      navigate('/login')
    } catch (error: any) {
      console.error("Error:", error.message);
    }

  }

  return (
    <div className='h-[4rem] top-0 sticky z-[900] bg-neutral-700 flex items-center px-[1rem] justify-between w-full'>
      <Link onClick={() => setActive(false)} to='/' className='font-bold text-lg text-white'>Deck Task</Link>
      <div className='flex items-center justify-start gap-x-[1rem]'>

        <div className='h-[2.3rem] w-[2.3rem]  rounded-full overflow-hidden'>
          <img className={`w-full ${imageLoad ? "block" : "hidden"}  h-full`} onLoad={handleImageLoad} src={user.avatar} alt="" />
        </div>
        <span onClick={handleLogout} className='font-[700] cursor-pointer hover:text-pink-400 text-white'>
          Logout
        </span>


      </div>
    </div>
  );
};

export default NavBar;
