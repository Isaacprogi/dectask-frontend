import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TaskContextProps } from '../types/types';

  
  const useTaskContext = (): TaskContextProps => {
    const context = useContext(TaskContext);
    if (!context) {
      throw new Error('useStatusContext must be used within a StatusContextProvider');
    }
    return context;
  };
  
  export default useTaskContext;