
import axios from "axios";

const baseUrl:string = 'http://localhost:4000/api'

 export const uploadAvatar = async (formData:FormData): Promise<any> => {
   return await axios.post(`${baseUrl}/media/upload`, formData );
 };