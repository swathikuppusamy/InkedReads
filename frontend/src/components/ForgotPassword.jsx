import axios from 'axios';
import React, { useState } from 'react'
import bgImage from '../assets/books-shelf.jpg';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    
    const [email,setEmail]=useState('');
  

    const navigate=useNavigate()

    // const handleSubmit=(e)=>{
    //     e.preventDefault()
    //     axios.post('http://localhost:3000/auth/forgot-password',{email}).then(response=>{
    //        // console.log(response)
    //        if(response.data.status)
    //        {
    //         alert("Check your mail for password reset link")
    //        navigate('/login')
    //        }
    //        console.log(response.data)
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/forgot-password', { email })
            .then(response => {
                if (response.data.status) {
                    alert("Check your email for the password reset link");
                    navigate('/login');
                } else {
                    alert(response.data.message || "Error sending reset link");
                }
            })
            .catch(err => {
                console.error("Error:", err);
                alert("An error occurred, please try again later.");
            });
    };
    
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})`}}>
      {/* Optional overlay for darkening the background */}
      <div className="absolute inset-0 bg-black opacity-0"></div>

      {/* Frosted glass effect for the form container */}
      <div className="relative bg-opacity-0 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center text-white">Forgot Password</h2>
          
         
          
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
          
          
          
          <button 
            type="submit" 
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-lg font-semibold transition-colors duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
