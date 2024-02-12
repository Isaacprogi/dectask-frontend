import { NavLink } from 'react-router-dom'
import { MdAdd } from "react-icons/md";
import { BsChevronLeft } from 'react-icons/bs'
import useStatusContext from '../../hooks/useStatusContext';
import { useLocation } from 'react-router-dom';
import useHeaderContext from '../../hooks/useHeaderContext';
import { ChangeEvent } from 'react';
import useTaskContext from '../../hooks/useTaskContext';


const Header = () => {
  const { statuses, setStatuses } = useStatusContext()
  const { pathname } = useLocation()
  const {setModalActive} = useTaskContext()

  const onEditRoute: boolean = pathname === '/edit' || pathname === '/new'

  const handleStatusClick = (id: number) => {
    const updatedStatuses = statuses.map(status =>
      status.id === id ? { ...status, active: true } : { ...status, active: false }
    );
    setStatuses(updatedStatuses)
  };

  const handleChange = (e:ChangeEvent<HTMLSelectElement>) => {
    const updatedStatuses = statuses.map(status =>
      status.value === e.target.value ? { ...status, active: true } : { ...status, active: false }
    );
    setStatuses(updatedStatuses)
  }


  const { active, setActive } = useHeaderContext()

  return (
    <div className="w-full bg-neutral-100 px-[1rem] h-[4rem] flex items-center justify-start gap-x-[1rem] sm:gap-x-[5rem]">

      <div>
        {
          (!active && !onEditRoute) ? <NavLink onClick={() =>{
            setActive(true)
          } } end
            className='rounded-md bg-neutral-600 hover:bg-neutral-500 text-white flex 
          items-center justify-center  w-[5rem] h-[2.5rem] transition-all duration-300'
            to='/new'>
            <span>
              Add
            </span>
            <span>
              <MdAdd />
            </span>
          </NavLink> : <NavLink onClick={() => {
              setActive(false)
              setModalActive(false)
          } } end
            className='rounded-md  bg-neutral-600 hover:bg-neutral-500 w-[5rem] h-[2.5rem] text-white flex 
          items-center justify-center text-[4xl]  transition-all duration-300'
            to='/'>
            <BsChevronLeft />
          </NavLink>
        }


      </div>

      {
        (!active && !onEditRoute) &&
        <>
          <div className='hidden sm:flex items-center gap-x-[1rem]'>
            {
              statuses.map(status => {
                return <div onClick={() => handleStatusClick(status.id)} key={status.id} className={`${status.active ? "text-pink-400" : "text-black "} font-[600] cursor-pointer`}>
                  {status.value}
                </div>
              })
            }
          </div>
          <select
            id='status'
            name='status'
            onChange={handleChange}
            className='w-full h-[2.5rem] max-w-[13rem]  max-w-[15rem] sm:hidden resize-none border border-grey-200 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200'
          >
            {
              statuses.map(status => {
                return <option key={status.value} value={status.value}>{status.value}</option>
              })
            }

          </select>
        </>
      }



    </div>
  )
}

export default Header