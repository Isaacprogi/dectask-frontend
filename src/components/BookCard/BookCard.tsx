interface Props {
    id: number
}

import { useNavigate } from 'react-router-dom'

const BookCard: React.FC<Props> = (props) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/book/${props.id}`)} className='bg-blue-500 flex flex-col rounded-md shadow-lg gap-[1rem] items-center justify-center cursor-pointer transition-all duration-300 hover:bg-blue-600 text-white w-[9rem] h-[8rem]'>
            <span className="font-[900]">Book</span>
            <span>{props.id}</span>
        </div>
    )
}

export default BookCard