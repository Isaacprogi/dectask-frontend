import { Task, addTaskType } from "../types/types";
import axios from "axios";

const baseUrl:string = 'http://localhost:4000/api'

export const fetchTasksApiCall = async (config:Object): Promise<any> => {
    return await axios.get(`${baseUrl}/task`,config)
 }

 export const addTaskApiCall = async (task: addTaskType,config:Object): Promise<any> => {
   return await axios.post(`${baseUrl}/task`, task,config);
 };
  
export const deleteTaskApiCall = async (taskId: string,config:Object): Promise<void> => {
    console.log(taskId)
    return  await axios.delete(`${baseUrl}/task/${taskId}`,config)
  };
  
export const updateTaskApiCall = async (taskId: string, updatedTask: Task,config:Object): Promise<void> => {
   return  await axios.put(`${baseUrl}/task/${taskId}`,updatedTask,config)
  };