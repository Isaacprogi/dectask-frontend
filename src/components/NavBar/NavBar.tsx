import { IoIosNotificationsOutline } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const {logout,user} = useAuthContext()

  const handleLogout = () =>{
    logout()
  }

  return (
    <div className='h-[4rem] top-0 sticky z-[900] bg-neutral-700 flex items-center px-[1rem] justify-between w-full'>
      <Link to='/' className='font-bold text-lg text-white'>Deck Task</Link>
      <div className='flex items-center justify-start gap-x-[1rem]'>

         <span onClick={handleLogout} className='font-[700] cursor-pointer hover:text-pink-400 text-white'>
          Logout
         </span>

        <div className='h-[2rem] w-[2rem]  rounded-full overflow-hidden'>
          <img className='w-full h-full' src={user.avatar} alt="" />
        </div>

        <NavLink to='/notifications'
          className={({ isActive, isPending }) =>
            isPending ? "pending relative" : isActive ? "text-green-500 relative transition-all duration-300 text-2xl " : "text-3xl relative transition-all duration-300 text-white"
          }
        >
          <div className='bg-red-500 absolute flex items-center justify-center top-[-.2rem] right-0 w-[1rem] h-[1rem] rounded-full overflow-hidden'>
            <span className='bg-white h-[.3rem] w-[.3rem] rounded-full overflow-hidden'></span>
          </div>
          <IoIosNotificationsOutline />
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
