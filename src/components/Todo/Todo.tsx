import TaskCard from "../TaskCard/TaskCard"
import useTaskContext from "../../hooks/useTaskContext"
import { Task } from "../../types/types"
import useStatusContext from "../../hooks/useStatusContext"
import { ClipLoader } from "react-spinners"

const Todo = () => {
  const {state,loading} = useTaskContext()
  const {statuses} = useStatusContext()

  const activeStatus = statuses.find((status) => status.active);
  
  const filteredStatus = state.tasks.filter(task=>{
    return activeStatus?.value === task.status
  })

  return (
    <div className='flex gap-[1rem] justify-center flex-wrap px-[1rem] gap-y-[.5rem] py-[2rem]  w-full'>
      {
        loading.getTasks && <ClipLoader color='black' size={18} />
       }
       {
        filteredStatus.map((task:Task)=>{
          return <TaskCard key={task._id} task={task}/>
        })
       }  
    </div>
  )
}

export default Todo