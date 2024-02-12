import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import AddTask from './pages/AddTask/AddTask';
import Task from './components/TaskCategory/TaskCategory';
import EditTask from './pages/EditTask/EditTask';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { useAuthContext } from './hooks/useAuthContext';
import { useEffect } from 'react'
import useTaskContext from './hooks/useTaskContext';
import { useLocation } from 'react-router-dom';
import useHeaderContext from './hooks/useHeaderContext';

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const { token } = useAuthContext();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return element;
};

const PublicRoute = ({ element }: { element: React.ReactNode }) => {
  const { token } = useAuthContext();
  if (token) {
    return <Navigate to="/" />;
  }
  return element;
};

const App = () => {
  const { token, refresh } = useAuthContext();
  const {getTasks} = useTaskContext()
  const {pathname} = useLocation()
  const {setActive} = useHeaderContext()

  const onHomeRoute: boolean = pathname === '/'

  useEffect(()=>{
      setActive(false)
  },[onHomeRoute])

  useEffect(()=>{
    refresh()
  },[])

  useEffect(()=>{
   getTasks()
  },[token])

  return (
    <div className='w-full transition-all duration-300 h-screen'>
      {token && <NavBar />}
      <Routes>
        <Route path='/' element={<PrivateRoute element={<Home />} />}>
          <Route index element={<Task />} />
          <Route path='/new' element={<AddTask />} />
          <Route path='/edit' element={<EditTask />} />
        </Route>
        <Route path='/login' element={<PublicRoute element={<Login />} />} />
        <Route path='/register' element={<PublicRoute element={<Register />} />} />
      </Routes>
    </div>
  );
};

export default App;
