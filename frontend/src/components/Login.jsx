import React, { useState } from 'react';
import axios from 'axios'
import bgImage from '../assets/books-shelf.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const navigate=useNavigate()

    axios.defaults.withCredentials=true;
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/auth/login',{email,password}).then(response=>{
           // console.log(response)
           if(response.data.status)
           {
           navigate('/home')
           }
        }).catch(error =>{
            console.error("Invalid email and password",error)
            alert("Invalid Email and Password")
        })
    }
    
  return (
    
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})`}}>
      {/* Optional overlay for darkening the background */}
      <div className="absolute inset-0 bg-black opacity-0"></div>

      {/* Frosted glass effect for the form container */}
      <div className="relative bg-opacity-0 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center text-white">Login</h2>
          
          
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input 
              type="email" 
              id="email"
              autoComplete="off" 
              placeholder="Email" 
              className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input 
              type="password" 
              id="password"
              placeholder="******" 
              className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
              onChange={(e)=>setPassword(e.target.value)}
           />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-lg font-semibold transition-colors duration-200"
          >
            Login
          </button>
          <Link to="/forgotpassword"className='text-md  text-gray-500' >Forgot password?</Link>
          <p className='block text-md font-medium text-gray-300'>Don't have an Account? <Link className='text-md text-gray-800' to="/">Sign Up</Link></p> 
        
        </form>
      </div>
    </div>
  );
};

export default Login;
