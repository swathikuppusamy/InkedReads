import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import imgbook from '../assets/bg-nli.jpg';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin 
      ? 'http://localhost:5057/api/auth/login' 
      : 'http://localhost:5057/api/auth/signup';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.token) {
        localStorage.setItem('authToken', result.token);
      }

      if (result.userId) {
        localStorage.setItem('userId', result.userId);
      }

      navigate('/front');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${imgbook})` }}
    >
      

      {/* Frosted glass effect container */}
      <div className="relative  backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center text-white">
            {isLogin ? 'InkedReads Login' : 'Join InkedReads'}
          </h2>

          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-lg font-semibold transition-colors duration-200"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          {isLogin ? (
            <>
              <p className="text-center text-gray-500"><Link to="/forgot-password">Forgot password?</Link></p>
              <p className="text-center text-gray-300">
                Don't have an account?{' '}
                <button onClick={toggleForm} className="text-gray-200 hover:text-white">Sign Up</button>
              </p>
            </>
          ) : (
            <p className="text-center text-gray-300">
              Already have an account?{' '}
              <button onClick={toggleForm} className="text-gray-200 hover:text-white">Login</button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
