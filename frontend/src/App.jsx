import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Readbooks from './components/ReadBook'
import BooksSearch from './components/CandAsearch'
import FavPage from './components/Favourite'
import FeedbackForm from './components/Feedback'
import Profile from './components/Profile'



function App() {

  return (
   
    <BrowserRouter>
    
    <Routes>
    
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
      <Route path='/resetpassword/:token' element={<ResetPassword/>}></Route>
      </Routes>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/read-books' element={<Readbooks/>}></Route>
      <Route path='/search-books' element={<BooksSearch/>}></Route>
      <Route path='/favourites' element={<FavPage/>}></Route>
      <Route path='/feedback' element={<FeedbackForm/>}></Route>
      <Route path='/profile-settings' element={<Profile/>}></Route>



    </Routes>
    </BrowserRouter>
  )
}

export default App
