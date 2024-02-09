import TaskCard from "../TaskCard/TaskCard"
import useTaskContext from "../../hooks/useTaskContext"
import { Task } from "../../types/types"
import { ClipLoader } from "react-spinners"

const All = () => {
  const {state,loading} = useTaskContext()
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
    </div>
  )
}

export default All