import Modal from "../common/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { Task } from "../../types/types";
import useTaskContext from "../../hooks/useTaskContext";
import { BsPencil } from "react-icons/bs";
import { FaTrash } from 'react-icons/fa'
import { formatDate } from "../../utils/formatDate";
import './taskcard.css'
import { ClipLoader } from "react-spinners";

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const handleClose = () => setModalActive(false)
    const navigate = useNavigate()

    const { state,loading, dispatch,error,modalActive,setModalActive,deleteTask,setUpdateTaskForm,deleteActive,setDeleteActive } = useTaskContext()

    const handleEdit = () => {
        dispatch({
            type: 'SET_CURRENT_TASK',
            payload: task
        })
        setUpdateTaskForm(task)
        navigate('/edit')
    }

    const handleView = () => {
        dispatch({
            type: 'SET_CURRENT_TASK',
            payload: task
        })
        setModalActive(true)
    }

    const handleDeleteTask = () => {
        setDeleteActive(true)
    }

    const handleDelete =  () => {
        deleteTask(task._id)
    }

    const handleCancel = ()=> {
        setDeleteActive(false)
        setModalActive(false)
    }


    const formatDueDate = (dueDate: string | Date): string => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const due = new Date(dueDate);
        due.setHours(0, 0, 0, 0); 
        const timeDiff = due.getTime() - today.getTime();
        const dayDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24)); 
    
        if (dayDiff === 0) {
            return 'today';
        } else if (dayDiff === 1) {
            return 'tomorrow';
        } else if (dayDiff === -1) {
            return 'yesterday';
        } else if (dayDiff < 0) {
            return `${Math.abs(dayDiff)} days ago`;
        } else {
            return `in ${dayDiff} days`;
        }
    };
    
    

    return (
        <>
            <Modal isOpen={modalActive} handleClose={handleClose}>

                {
                    deleteActive ?
                        <div className="w-full text-center flex flex-col z-[800]  gap-[1rem] rounded-md overflow-hidden px-[1rem] py-[2rem] max-w-[40rem] h-[max-content] bg-white">
                            <div>Are you sure you want to delete this task</div>
                            <div className="flex items-center justify-center  gap-x-[1rem]">
                                <span onClick={handleCancel} className=" bg-neutral-600 hover:bg-neutral-500  flex items-center justify-center text-white  cursor-pointer h-[2rem] w-[6rem] rounded-md overflow-hidden">Cancel</span>
                                <span onClick={handleDelete} className=" bg-neutral-600 hover:bg-neutral-500  flex items-center justify-center text-white  cursor-pointer h-[2rem] w-[6rem] rounded-md overflow-hidden">
                                   {
                                    loading.deleteTask?<ClipLoader size={18} color="white"/>:'Yes'
                                   } 
                                </span>
                            </div>
                            <div className="h-[1rem]">
                                {error.deleteTask && "Task not deleted"}
                            </div>
                        </div>
                        : <div className="w-full text-center h-[max-content] flex flex-col z-[800]  gap-[1rem] rounded-md overflow-hidden p-[1rem] max-w-[40rem]  bg-white">
                            <span className="w-full text-3xl font-[600]  p-[1rem] bg-neutral-100 rounded-md overflow-hidden">
                                {state.currentTask.title}
                            </span>
                            <span className="w-full  p-[1rem] bg-neutral-100 rounded-md overflow-hidden">
                                {state.currentTask.description}
                            </span>
                            <span className="w-full  p-[1rem] bg-neutral-100 rounded-md overflow-hidden">
                                {state.currentTask.status}
                            </span>
                            <span className="w-full  p-[1rem]  bg-neutral-100 rounded-md overflow-hidden">
                                  {formatDate(task.dueDate)}
                            </span>

                            <div className="w-full  h-[4rem] flex text-2xl  items-center justify-center gap-x-[2rem]">

                                <div onClick={handleDeleteTask}  className="p-[1rem] hover:bg-neutral-200 cursor-pointer  rounded-full overflow-hidden">
                                    <FaTrash className=" text-pink-600" />
                                </div>
                                <div onClick={handleEdit} className="p-[1rem] hover:bg-neutral-200 cursor-pointer rounded-full overflow-hidden">
                                    <BsPencil  className="  text-blue-500" />
                                </div>
                            </div>
                        </div>
                }



            </Modal>

            <div onClick={handleView} className='w-full flex flex-col border-2 shadow-sm relative group bg-white p-[1rem] hover:border-blue-500 hover:border-2 rounded-lg hover:bg-neutral-100 hover:shadow-lg cursor-pointer transition-all duration-300 overflow-hidden h-[9rem] max-w-[20rem]'>
                <span className="bottom-[.1rem] left-[1rem] absolute rounded-full text-gray-600 text-[.8rem] font-[400]">
                    <div className="flex flex-wrap gap-x-[.4rem]">
                        <span className="font-[600] flex text-pink-600">Due</span>
                        {formatDueDate(task.dueDate)} :
                        <span className="bg-red-200 text-gray-700 rounded-md px-[.2rem]">
                        {`${formatDate(task.dueDate)}`}
                        </span>
                    </div>
                </span>
                <span className="text-lg font-[600]">{task.title}</span>
                <span className="w-full tex-elip pb-[.7rem]">
                    {task.description}
                </span>
                <span onClick={(e) => { e.stopPropagation(); handleEdit(); }} className="text-[1rem] rounded-full absolute right-[.4rem] hidden md:group-hover:flex text-black top-[.3rem] hover:bg-neutral-200 h-[2rem] min-w-[2rem] flex items-center justify-center rounded-full overflow-hidden">
                    <BsPencil />
                </span>
            </div>
        </>
    )
}

export default TaskCard