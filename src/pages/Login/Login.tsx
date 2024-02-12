import React, { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Login: React.FC = () => {
    const { login, error, setError,loading } = useAuthContext();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        setError(prev=>({...prev,login:""}))
        e.preventDefault();
        login(credentials);
    };


    const handleRegister = () => {
        navigate('/register');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setError({ ...error, login: "" })
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center items-center justify-center'>
            <h1 className='text-center font-[500] text-3xl text-gray-500'>Welcome!</h1>
            <form onSubmit={handleLogin} className="max-w-md w-full mx-auto mt-8 p-4 rounded">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full p-2 mb-2 hover:bg-neutral-100 duration-300 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full p-2 mb-4 hover:bg-neutral-100 duration-300 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                <div className='mb-[1rem]'>
                    <span className='text-[.9rem] text-gray-700'>New to Deck task?</span>{' '}
                    <span onClick={handleRegister} className='font-[500] text-gray-700 cursor-pointer'>
                        Register
                    </span>
                </div>
                <div className='w-full flex items-center justify-center'>
                   <button
                        onClick={handleLogin}
                        className="bg-neutral-700 text-white h-[2.5rem] w-[6rem] flex items-center justify-center rounded hover:bg-neutral-600 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        {
                       loading.login? <ClipLoader color='white' size={18} />:"Login"
                        }
                        
                    </button>
                </div>

                <div className='h-[4rem] w-full flex items-center justify-center'>
                    {error.login && error.login}
                </div>
            </form>
        </div>
    );
};

export default Login;
