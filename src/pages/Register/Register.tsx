import React, { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { uploadAvatar } from '../../api/media';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const { register,error,setError,loading } = useAuthContext();
    const [passwordError,setPasswordError] = useState<string>('')
    const [avatarLoading,setAvatarLoading] = useState<Boolean>(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatarFile: null as File | null,
    });

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError({...error,register:""})
        setPasswordError("")
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                avatarFile: file,
            });
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("")
        setAvatarLoading(true)
        if(formData.password !== "" &&  formData.confirmPassword !== ""){
            if(formData.password !== formData.confirmPassword){
                setAvatarLoading(false)
                setPasswordError("Passwords don't match")
                return
             }
        }
        try {
            let response: any;
            if (formData.avatarFile && formData.fullName && formData.email && formData.password && formData.confirmPassword) {
                const formDataForAvatar = new FormData();
                formDataForAvatar.append('file', formData.avatarFile);
                response = await uploadAvatar(formDataForAvatar);
            }
            register({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                avatar: response?.data?.url,
            });
            setAvatarLoading(false)
        } catch (error) {
            setAvatarLoading(false)
            console.error('Error during registration:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError({...error,register:""})
        setPasswordError("")
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center items-center justify-center'>
            <h1 className='text-center font-[500] mt-[1rem] rounded-full overflow-hidden text-2xl text-gray-500'>
                DECK TASK
            </h1>
            <form className="max-w-md w-full mx-auto mt-4 p-4 rounded">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full p-2 hover:bg-neutral-100 duration-300 mb-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full p-2 hover:bg-neutral-100 duration-300 mb-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full p-2 mb-2 hover:bg-neutral-100 duration-300 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full hover:bg-neutral-100 duration-300 p-2 mb-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                    Profile Picture
                </label>
                <div className="flex  items-center">
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={handleAvatarChange}
                        className="sr-only"
                    />
                    <label
                        htmlFor="avatar"
                        className="w-full p-2 h-[4rem]  hover:bg-neutral-100 duration-300 mb-4 gap-x-[1rem] border border-gray-400 rounded cursor-pointer flex items-center"
                    >
                        {formData.avatarFile ? (
                            <img
                                src={URL.createObjectURL(formData.avatarFile)}
                                alt="Avatar Preview"
                                className="w-10 h-10 object-cover rounded-full mr-2"
                            />
                        ) : (
                            <FaUserCircle className='text-3xl text-blue-500'/>
                        )}
                        <span className='text-[.8rem]'>
                            {formData.avatarFile ? 'Change Profile Picture' : 'Choose Profile Picture'}
                        </span>
                    </label>
                </div>
                <div className='mb-[1rem]'>
                    <span className='text-[.9rem] text-gray-700'>Already have an account?</span>{' '}
                    <span onClick={handleLogin} className='font-[500] text-gray-700 cursor-pointer'>
                        Login
                    </span>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <button
                        onClick={handleRegister}
                        className="bg-neutral-700 hover:bg-neutral-600 text-white flex items-center justify-center h-[2.5rem] w-[6rem] rounded focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        {
                       loading.register ||  avatarLoading? <ClipLoader color='white' size={18} />:"Register"
                        }
                        
                    </button>
                </div>

                <div className='h-[4rem] w-full flex items-center justify-center'>
                    {error.register? error.register:passwordError?passwordError:""}
                </div>
            </form>
        </div>
    );
};

export default Register;
