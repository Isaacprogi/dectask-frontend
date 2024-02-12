import TaskCard from "../TaskCard/TaskCard"
import useTaskContext from "../../hooks/useTaskContext"
import { Task } from "../../types/types"
import { ClipLoader } from "react-spinners"
import useHeaderContext from "../../hooks/useHeaderContext"
import { useNavigate } from "react-router-dom"

const All = () => {
  const {state,loading} = useTaskContext()
  const {setActive} = useHeaderContext()
  const navigate = useNavigate()

  const handleNavigate = () => {
    setActive(true)
    navigate('/new')
  }

  return (
    <div className='flex gap-[1rem] justify-center flex-wrap px-[1rem] gap-y-[.5rem] py-[2rem]  w-full'>
       {
        loading.getTasks && <ClipLoader color='black' size={18} />
       }
       {
         (state.tasks.length > 0 && !loading.getTasks) && state.tasks.map((task:Task)=>{
          return <TaskCard key={task._id} task={task}/>
        })
       }  

       {
        (state.tasks.length < 1 && !loading.getTasks) && 
        <div className="flex flex-col gap-y-[.4rem]">
          <div className="text-center">
               You dont have any task.
          </div>
          <div onClick={handleNavigate} className="w-[10rem] rounded-md hover:bg-neutral-500 cursor-pointer flex items-center justify-center bg-neutral-700 text-neutral-100 h-[2rem]">
          Add one
        </div>
        </div>
       }
    </div>
  )
}

export default All