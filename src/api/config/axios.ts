import axios from 'axios'


axios.defaults.withCredentials = true

export const axiosConfig = axios.create({
    // baseURL: 'https://linkedin-clone-api.onrender.com/api/',
    baseURL: 'http://localhost:4000/api/',
})