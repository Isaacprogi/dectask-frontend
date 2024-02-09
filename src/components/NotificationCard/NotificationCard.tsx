import { Task } from "../../types/types"
interface NotificationCardProps {
  task:Task
}

const NotificationCard:React.FC<NotificationCardProps> = ({task}) => {
  return (
    <div className='w-full hover:bg-neutral-300 h-[5rem] bg-neutral-200 rounded-md flex items-center justify-center'>
        task with title <span className="font-bold text-2xl mr-2 ml-2">{task.title}</span> will be due soon
    </div>
  )
}

export default NotificationCard