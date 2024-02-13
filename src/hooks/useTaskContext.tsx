import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TaskContextProps } from '../types/types';

  
  const useTaskContext = (): TaskContextProps => {
    const context = useContext(TaskContext);
    if (!context) {
      throw new Error('useTaskContext must be used within a TaskContextProvider');
    }
    return context;
  };
  
  export default useTaskContext;