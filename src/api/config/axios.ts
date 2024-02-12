import axios from 'axios'


axios.defaults.withCredentials = true

export const axiosConfig = axios.create({
    baseURL: 'https://decktaskapi.onrender.com//api/',
})