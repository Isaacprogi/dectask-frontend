import React, {ChangeEvent, FormEvent } from 'react';
import useTaskContext from '../../hooks/useTaskContext';
import CustomDatePicker from '../../components/common/DatePicker/DatePicker';
import { ClipLoader } from 'react-spinners';

const EditTask: React.FC = () => {
  const { error,updateTaskForm,setUpdateTaskForm, loading, updateTask,setModalActive } = useTaskContext()



  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdateTaskForm((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setUpdateTaskForm((prevTask) => ({
      ...prevTask,
      dueDate: date ? date.toISOString() : '',
    }));
  };


  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    updateTask(updateTaskForm._id,updateTaskForm)
    setModalActive(false)
  };



  return (
    <div className='w-full py-[3rem] flex flex-col items-center px-[1rem]   justify-center'>
      <form onSubmit={handleSubmit} className='w-full  max-w-[40rem]'>

        {/* title */}
        <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
          Title
        </label>
        <input
          type='text'
          id='title'
          name='title'
          value={updateTaskForm.title}
          onChange={handleChange}
          placeholder='Enter task title'
          className='w-full p-2 mb-2 border border-gray-400 max-w-[15rem]  rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200'
        />

        {/* description */}
        <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
          Description
        </label>
        <textarea
          id='description'
          name='description'
          value={updateTaskForm.description}
          onChange={handleChange}
          placeholder='Enter task description'
          rows={4}
          className='w-full overflow-y-auto p-2 mb-2 resize-none border border-gray-400  rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200'
        ></textarea>

        {/* status and dueDate */}
        <div className='flex flex-col gap-[1rem]'>
          <div className='w-full max-w-[15rem]'>
            <label htmlFor='status' className='block text-sm font-medium text-gray-700'>
              Status
            </label>
            <div className=' w-full px-[.5rem] mb-2   bg-white resize-none border border-gray-400  rounded focus-within:outline-none focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-200'>
            <select
                id='status'
                name='status'
                value={updateTaskForm.status}
                onChange={handleChange}
                className='w-full p-[.5rem] h-full outline-none'
              >
                <option value='' disabled hidden>
                  Select Status
                </option>
                <option value='To Do'>To Do</option>
                <option value='In Progress'>In Progress</option>
                <option value='Done'>Done</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor='dueDate' className='block text-sm font-medium text-gray-700'>
              Due Date
            </label>
            <CustomDatePicker onDateChange={handleDateChange} initialDate={new Date(updateTaskForm.dueDate)} />
          </div>

        </div>

        {/* button */}
        <div className='w-full flex items-center justify-center mt-[1rem]'>
        <button disabled={loading.addTask} type='submit' className='w-full cursor-pointer bg-neutral-600 hover:bg-neutral-500 max-w-[10rem] mx-auto p-2 text-white rounded'>
            {loading.updateTask?<ClipLoader color='white' size={15} />:'Update'}
          </button>
        </div>
      </form>

      {/* error */}
      <div className='w-full block text-black h-[3rem] flex items-center justify-center'>
        {error && error.updateTask}
      </div>
    </div>
  );
};

export default  EditTask;
