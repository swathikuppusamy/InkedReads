import axios from '../utils/axiosConfig.js';
import React, { useState } from 'react';
import { FaHome, FaPhone, FaInfoCircle, FaImage, FaBars, FaTimes, FaBook, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import Link

const Navbar = () => {
    const navigate=useNavigate()
  const [isActive, setIsActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


    const handleLogout=()=>{
        axios.get('api/auth/logout')
        .then(res=>{
            if(res.data.status){
                
                setIsDropdownOpen(false);
                alert("You are going to logged out")
                navigate('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
  

  return (
    <nav className='bg-gray-700 py-5 '>
      <div className='flex justify-between items-center text-white px-6 md:px-20'>
        <div>
          <span className='text-3xl font-bold flex items-center'><FaBook className='mr-2' /><Link to='/front'>InkedReads</Link></span>
        </div>
        
        {/* Desktop Links */}
        <div className='hidden md:flex space-x-4'>
          <Link to='/award' className='hover:bg-gray-800 hover:shadow-lg transition-all duration-300 py-1.5 px-4 rounded'>
            Home
          </Link>
          <Link to='/bookreader' className='hover:bg-gray-800 hover:shadow-lg transition-all duration-300 py-1.5 px-4 rounded'>
            Read Books
          </Link>
          <Link to='/book' className='hover:bg-gray-800 hover:shadow-lg transition-all duration-300 py-1.5 px-4 rounded'>
            Search Books
          </Link>
          <Link to='/favorite' className='hover:bg-gray-800 hover:shadow-lg transition-all duration-300 py-1.5 px-4 rounded'>
            Favourites
          </Link>
          <Link to='/feedback' className='hover:bg-gray-800 hover:shadow-lg transition-all duration-300 py-1.5 px-4 rounded'>
            Your Feedbacks
          </Link>
          <div className='relative'>
            <button 
              onClick={toggleDropdown}
              className='flex items-center hover:bg-gray-800 transition-all duration-300 py-1.5 px-4 rounded'
            >
              <FaUser className='mr-2 mt-1' />
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-20'>
                <ul className='py-2'>
                  <li>
                    <Link 
                      to='/profile' // Replace with your profile settings route
                      className='block px-4 py-2 text-gray-300 hover:bg-gray-700'
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                    >
                      Profile Settings
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/recommendations' // Replace with your profile settings route
                      className='block px-4 py-2 text-gray-300 hover:bg-gray-700'
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                    >
                      Recommendations
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/feedform' // Replace with your profile settings route
                      className='block px-4 py-2 text-gray-300 hover:bg-gray-700'
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                    >
                      Give Feedback
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className='block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700'
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden'>
          <button 
            onClick={() => setIsActive(!isActive)}
            className='text-white focus:outline-none'
          >
            {isActive ? <FaTimes className='h-6 w-6' /> : <FaBars className='h-6 w-6' />}
          </button>
        </div>
      </div>
      
      {/* Mobile Links - Uncomment and adapt if you want mobile links */}
      {/* {isActive && ( ... )} */}
    </nav>
  );
};

export default Navbar;
