
import axios from "axios";

const baseUrl:string = 'https://decktaskapi.onrender.com/api'

 export const uploadAvatar = async (formData:FormData): Promise<any> => {
   return await axios.post(`${baseUrl}/media/upload`, formData );
 };