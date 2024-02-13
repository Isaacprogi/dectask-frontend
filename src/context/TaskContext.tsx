import React, { createContext, ReactElement, useReducer } from "react";
import { Task, TaskAction, TaskContextProps, TaskState, addTaskType, taskError, taskLoading } from "../types/types";
import { fetchTasksApiCall, deleteTaskApiCall, updateTaskApiCall, addTaskApiCall } from "../api/task";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import useHeaderContext from "../hooks/useHeaderContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMemo } from "react";


export const TaskContext = createContext<TaskContextProps | undefined>(undefined);


const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((task) => task._id !== action.payload) };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload.taskId ? action.payload.updatedTask : task
        ),
      };
    case "SET_CURRENT_TASK":
      return { ...state, currentTask: action.payload };
    default:
      return state;
  }
};


const TaskContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [], currentTask: { _id: '', title: '', description: '', status: '', dueDate: '' } });
  const [loading, setLoading] = useState<taskLoading>({
    getTasks: false,
    addTask: false,
    deleteTask: false,
    updateTask: false
  })
  const [error, setError] = useState<taskError>({
    getTasks: "",
    addTask: "",
    deleteTask: "",
    updateTask: ""
  })

  const [addTaskForm, setAddTaskForm] = useState<addTaskType>({
    title: '',
    description: '',
    status: 'To Do',
    dueDate: new Date().toISOString()
  })

  const [updateTaskForm, setUpdateTaskForm] = useState<Task>({
    _id: '',
    title: '',
    description: '',
    status: '',
    dueDate: '',
  })

  const navigate = useNavigate()

  const { setActive } = useHeaderContext()

  const [deleteActive, setDeleteActive] = useState<boolean>(false)
  const [modalActive, setModalActive] = useState<boolean>(false)

  const { token } = useAuthContext()

  const config = useMemo(() => ({
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }), [token])

  const getTasks = async () => {
    if (token) {
      setLoading(prev => ({ ...prev, getTasks: true }))
      setError(prev => ({ ...prev, getTasks: '' }))
      try {
        const { data } = await fetchTasksApiCall(config);
        dispatch({ type: "SET_TASKS", payload: data });
        setLoading(prev => ({ ...prev, getTasks: false }))
      } catch (error: any) {
        console.error("Error:", error.message);
        setError(prev => ({ ...prev, getTasks: error?.response?.data }))
        setLoading(prev => ({ ...prev, getTasks: false }))
      }
    }
  };


  const addTask = async (task: addTaskType) => {
    if (token) {
      setLoading(prev => ({ ...prev, addTask: true }))
      setError(prev => ({ ...prev, addTask: '' }))
      try {
        const { data } = await addTaskApiCall(task, config);
        dispatch({ type: "ADD_TASK", payload: data });
        setLoading(prev => ({ ...prev, addTask: false }))
        setAddTaskForm({
          title: '',
          description: '',
          status: 'To Do',
          dueDate: new Date().toISOString(),
        })
        setActive(false)
        navigate('/')
      } catch (error: any) {
        console.error("Error:", error?.message);
        setError(prev => ({ ...prev, addTask: error?.response?.data }))
        setLoading(prev => ({ ...prev, addTask: false }))
      }
    }
  };

  const deleteTask = async (taskId: string) => {
    if (token) {
      setLoading(prev => ({ ...prev, deleteTask: true }))
      setError(prev => ({ ...prev, deleteTaskTask: '' }))
      try {
        console.log('weal')
        await deleteTaskApiCall(taskId, config);
        dispatch({ type: "DELETE_TASK", payload: taskId });
        setLoading(prev => ({ ...prev, deleteTask: false }))
        setDeleteActive(false)
        setModalActive(false)
      } catch (error: any) {
        console.error("Error:", error?.message);
        setError(prev => ({ ...prev, deleteTask: error?.response?.data }))
        setLoading(prev => ({ ...prev, deleteTasks: false }))
      }
    }
  };


  const updateTask = async (taskId: string, updatedTask: Task) => {
    if (token) {
      setLoading(prev => ({ ...prev, updateTask: true }))
      setError(prev => ({ ...prev, updateTask: '' }))
      try {
        await updateTaskApiCall(taskId, updatedTask, config);
        dispatch({ type: "UPDATE_TASK", payload: { taskId, updatedTask } });
        setLoading(prev => ({ ...prev, updateTask: false }))
        setUpdateTaskForm({
          _id: '',
          title: '',
          description: '',
          status: '',
          dueDate: new Date().toISOString(),
        })
        setActive(false),
        navigate('/')
      } catch (error: any) {
        console.error("Error:", error?.message);
        setError(prev => ({ ...prev, updateTask: error?.response?.data }))
        setLoading(prev => ({ ...prev, updateTask: false }))
      }
    }
  };



  const contextValue: TaskContextProps = {
    state,
    loading,
    error,
    dispatch,
    getTasks,
    addTask,
    deleteTask,
    updateTask,
    addTaskForm,
    setAddTaskForm,
    updateTaskForm,
    setUpdateTaskForm,
    deleteActive,
    setDeleteActive,
    modalActive,
    setModalActive,
  };


  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
