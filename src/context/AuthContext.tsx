// src/context/AuthContext.tsx
import React, { createContext, useState } from 'react';
import { AuthContextType,LoginData,  RegisterData, authError,authLoading } from '../types/types';
import { loginApi, registerApi, refreshApi,logoutApi } from '../api/auth';
import { User } from '../types/types';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [user, setUser] = useState<User>({ id: "", fullName: '', email: '', avatar: '' });
  const [token, setToken] = useState<string | undefined>(Cookies.get('bas-tok'));
  const [error, setError] = useState<authError>({ login: "", register: "",logout:"", refresh: "" })
  const [loading, setLoading] = useState<authLoading>({ login: false, register: false,logout:false, refresh:false })

  const navigate = useNavigate()

  const login = async (user: LoginData) => {
    setLoading(prev => ({ ...prev, login: true }))
    try {
      const { data } = await loginApi(user)
      const { accesstoken, ...others } = await data
      setUser(others)
      setToken(accesstoken)
      Cookies.set('bas-tok', accesstoken, {
        expires: 30 / (24 * 60), // 30 minutes
        secure: true,
        sameSite: 'Strict',
        httpOnly: true 
      });
      navigate('/')
      setLoading(prev => ({ ...prev, login: false }))
    } catch (error: any) {
      console.error("Error:", error.message);
      setError(prev => ({ ...prev, login: error?.response?.data }))
      setLoading(prev => ({ ...prev, login: false }))
    }
  };

  const register = async (user: RegisterData) => {
    setLoading(prev => ({ ...prev, register: true }))
    try {
      const { data } = await registerApi(user)
      const { accesstoken,...others } = await data
      setUser(others)
      setToken(accesstoken)
      Cookies.set('bast-tok', accesstoken, {
        expires: 30 / (24 * 60), // 30 minutes
        secure: true,
        sameSite: 'Strict',
        httpOnly: true 
      });
      navigate('/')
      setLoading(prev => ({ ...prev, register: false }))
    } catch (error: any) {
      console.error("Error:", error.message);
      setError(prev => ({ ...prev, register: error?.response?.data }))
      setLoading(prev => ({ ...prev, register: false }))
    }
  };

  const logout = async () => {
    setLoading(prev => ({ ...prev, logout: true }))
    try {
      await logoutApi()
      setUser({ id: "", fullName: '', email: '', avatar: '' })
      setToken('')
      Cookies.remove('bast-tok');
      navigate('/login')
      setLoading(prev => ({ ...prev, logout: false }))
    } catch (error: any) {
      console.error("Error:", error.message);
      setError(prev => ({ ...prev, logout: error?.response?.data }))
      setLoading(prev => ({ ...prev, logout: true }))
    }
  };


  const refresh = async () => {
    setLoading(prev => ({ ...prev, refresh: true }))
    try {
      const { data } = await refreshApi()
      const { accesstoken, ...others } = await data
      if (others) {
        setUser(others)
      }
      if(accesstoken){
        Cookies.set('bast-tok', accesstoken, {
          expires: 30 / (24 * 60),
          secure: true,
          sameSite: 'Strict',
          httpOnly: true 
        });
      }
      setLoading(prev => ({ ...prev, refresh: false }))
    } catch (error: any) {
      console.log(error.message)
      console.error("Error:", error.message);
      setLoading(prev => ({ ...prev, refresh: false }))
      setError(prev => ({ ...prev, refresh: error?.response?.data }))
    }
  };


  const contextValue: AuthContextType = {
    user,
    setUser,
    token,
    setToken,
    login,
    logout,
    loading,
    setLoading,
    setError,
    register,
    refresh,
    error,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

