import axios from '../utils/axiosConfig.js';
import React, { useState } from 'react'
import bgImage from '../assets/books-shelf.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {

    
    const [password,setPassword]=useState('');
    const {token}= useParams()

    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('api/auth/reset-password/'+token,{password}).then(response=>{
           // console.log(response)
           if(response.data.status)
           {
            alert("Your password has been resetted successfully")
           navigate('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})`}}>
      {/* Optional overlay for darkening the background */}
      <div className="absolute inset-0 bg-black opacity-0"></div>

      {/* Frosted glass effect for the form container */}
      <div className="relative bg-opacity-0 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center text-white">Reset Password</h2>
          
         
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">New Password</label>
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
            Reset
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
