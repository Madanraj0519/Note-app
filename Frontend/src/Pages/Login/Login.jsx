import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../Components/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }

    if(!password){
      setError("Please enter a valid password");
      return;
    }

    setError("");

    // Login APi Call
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email: email,
        password: password,
      });

      // Handle successful login response
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate('/')
      }
    } catch (error) {
      // Handle login error
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("An unexpected error occurred. Please try again");
      }
    }
  }

  return (
    <>
     <Navbar />

     <div className='flex items-center justify-center mt-28'>
      <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7'>Login</h4>

          <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='input-box w-full text-sm bg-transparent border-[1.5px]
          px-5 py-3 rounded mb-4 outline-none' />

          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

          { error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

          <button type='submit' className='btn-primary w-full text-sm bg-primary text-white p-2 rounded my-1
           hover:bg-blue-600'>Login</button>

          <p className='text-sm text-center mt-4'>
            Not registered yet?{" "}
            <Link to="/signUp" className="font-medium text-primary underline">Create an Account</Link>
          </p>
          
        </form>
      </div>
     </div>
    </>
  )
}

export default Login