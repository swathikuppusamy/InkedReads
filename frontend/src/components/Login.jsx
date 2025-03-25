import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig.js'; 
import imgbook from '../assets/bg-nli.jpg';

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prevent multiple submissions
        if (isLoading) return;

        const endpoint = isLogin ? 'api/auth/login' : 'api/auth/signup';

        try {
            // Set loading state
            setIsLoading(true);
            setError('');

            const response = await axios.post(endpoint, formData);

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }

            if (response.data.userId) {
                localStorage.setItem('userId', response.data.userId);
            }

            // Navigate after successful login/signup
            navigate('/front');
        } catch (error) {
            const errorMessage = error.response 
                ? error.response.data.message || 'An error occurred'
                : error.message;
            
            setError(errorMessage);
            console.error('Login/Signup Error:', errorMessage);
        } finally {
            // Reset loading state
            setIsLoading(false);
        }
    };

    const toggleForm = () => {
        // Prevent toggling during loading
        if (isLoading) return;

        setIsLogin(!isLogin);
        setFormData({ name: '', email: '', password: '' });
        setError('');
    };

    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${imgbook})` }}
        >
            <div className="relative backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold text-center text-white">
                        {isLogin ? 'InkedReads Login' : 'Join InkedReads'}
                    </h2>

                    {/* Error Message Display */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

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
                                disabled={isLoading}
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
                            disabled={isLoading}
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
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                            isLoading 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-gray-800 hover:bg-gray-900 text-white'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg 
                                    className="animate-spin h-5 w-5 mr-3" 
                                    viewBox="0 0 24 24"
                                >
                                    <circle 
                                        className="opacity-25" 
                                        cx="12" 
                                        cy="12" 
                                        r="10" 
                                        stroke="currentColor" 
                                        strokeWidth="4"
                                    ></circle>
                                    <path 
                                        className="opacity-75" 
                                        fill="currentColor" 
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Processing...
                            </div>
                        ) : (
                            isLogin ? 'Login' : 'Sign Up'
                        )}
                    </button>

                    {isLogin ? (
                        <>
                            <p className="text-center text-gray-500"><Link to="/forgot-password">Forgot password?</Link></p>
                            <p className="text-center text-gray-300">
                                Don't have an account?{' '}
                                <button 
                                    onClick={toggleForm} 
                                    disabled={isLoading}
                                    className={`text-gray-200 hover:text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Sign Up
                                </button>
                            </p>
                        </>
                    ) : (
                        <p className="text-center text-gray-300">
                            Already have an account?{' '}
                            <button 
                                onClick={toggleForm} 
                                disabled={isLoading}
                                className={`text-gray-200 hover:text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Login
                            </button>
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;