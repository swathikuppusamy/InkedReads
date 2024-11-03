import axios from 'axios'
import React from 'react'
//import { Link, useNavigate } from 'react-router-dom'
import AwardBooks from './AwardBooks'
//import AwardBooks from './AwardBooks'


const Home = () => {
   // const navigate=useNavigate()
    axios.defaults.withCredentials=true;
    // const handleLogout=()=>{
    //     axios.get('http://localhost:3000/auth/logout')
    //     .then(res=>{
    //         if(res.data.status){
    //             navigate('/login')
    //         }
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }
    
  return (
    <div>
     {/* <button ><Link to='/dashboard'>Dashboard</Link></button>
     <br/>

     <button onClick={handleLogout}>Logout</button> */}
    <AwardBooks/>
    </div>
  )
}

export default Home
