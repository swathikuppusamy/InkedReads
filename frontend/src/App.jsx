// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/CandAsearch';
import BookDetails from './components/BookDetails';
import Login from './components/Login'; 
import Front from './components/Home';
import Award from './components/AwardBooks';
import FeedForm from './components/Feedback';
import FeedList from './components/FeedbackList';
import Reader from './components/ReadBook';
import Profile from './components/Profile';
import Favorite from './components/Favourite';
import Recommendations from './components/Recommendation';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  const userId = localStorage.getItem('userId');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/book" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetails />} /> {/* Book details route */}
        <Route path="/front" element={<Front />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/award" element={<Award />} />
        <Route path="/feedform" element={<FeedForm />} />
        <Route path="/feedback" element={<FeedList />} />
        <Route path="/bookreader" element={<Reader />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/recommendations" element={<Recommendations userId={userId} />} />
      </Routes>
    </Router>
  );
}

export default App;
