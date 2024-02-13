import axios from "axios";
import { RegisterData,LoginData  } from "../types/types";

const baseUrl: string = 'https://decktaskapi.onrender.com/api';

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const loginApi = async (user: LoginData): Promise<any> => {
  return await api.post("/auth/login", user);
};

export const registerApi = async (user: RegisterData): Promise<any> => {
  return await api.post("/auth/register", user);
};

export const logoutApi = async (): Promise<any> => {
  return await api.post("/auth/logout");
};

export const refreshApi = async (): Promise<any> => {
  return await api.post("/auth/refresh_token");
};
