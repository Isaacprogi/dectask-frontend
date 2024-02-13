import { Dispatch } from "react";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export interface addTaskType {
  title: string;
  description: string;
  status?: string;
  dueDate: string;
}

export interface TaskState {
  tasks: Task[];
  currentTask: Task;
}


export type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "SET_CURRENT_TASK"; payload: Task }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "UPDATE_TASK"; payload: { taskId: string; updatedTask: Task } };


  export type taskError = {
    getTasks: string,
    addTask: string,
    updateTask: string, 
    deleteTask: string

  }
  export type taskLoading = {
    getTasks: boolean,
    addTask: boolean,
    updateTask:boolean, 
    deleteTask: boolean
  }

  export interface TaskContextProps {
    state: TaskState;
    loading: taskLoading;
    error: taskError;
    dispatch: Dispatch<TaskAction>;
    getTasks: () => void;
    addTask: (task: addTaskType) => void;
    deleteTask: (taskId: string) => void;
    updateTask: (taskId: string, updatedTask: Task) => void;
    addTaskForm:addTaskType;
    setAddTaskForm: React.Dispatch<React.SetStateAction<addTaskType>>;
    updateTaskForm:Task;
    setUpdateTaskForm: React.Dispatch<React.SetStateAction<Task>>;
    deleteActive:boolean;
    setDeleteActive:React.Dispatch<React.SetStateAction<boolean>>;
    modalActive:boolean;
    setModalActive:React.Dispatch<React.SetStateAction<boolean>>;
   
  }


export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id?: string,
  fullName: string,
  email: string,
  avatar: string,
}

export type authError = {
  login: string,
  register: string,
  logout: string, 
  refresh: string
}
export type authLoading = {
  login: boolean,
  register: boolean,
  logout: boolean, 
  refresh: boolean
}


export interface AuthContextType {
  user: User
  setUser:React.Dispatch<React.SetStateAction<User>>
  token: string | undefined,
  setToken:React.Dispatch<React.SetStateAction<string | undefined>>
  error: authError,
  setError: React.Dispatch<React.SetStateAction<{
    login: string;
    register: string;
    refresh: string;
    logout: string;
  }>>,
  loading:authLoading,
  setLoading: React.Dispatch<React.SetStateAction<{
    login: boolean;
    register: boolean;
    refresh: boolean;
    logout: boolean;
  }>>
  login: (userData: LoginData) => void;
  register: (userData: RegisterData) => void;
  logout: () => void
  refresh: () => void;
}

export interface HeaderContextProps {
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}