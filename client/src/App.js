import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home.js'; 
import SignUp from './pages/signUp.js'; import SignIn from './pages/signIn.js';
import Profile from './pages/Profile.js';
import MovieDetail from './pages/moiveDetail.js';import Authentication from './Authentication.js';
import './App.css';
import RemoveAccount from './pages/RemoveAccount.js';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/moviesinfo" element={<MovieDetail />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/removeaccount" element={<RemoveAccount />} /> 
          {/* Add more routes for other pages */}
        </Routes>

        {/* Conditionally render Footer only on the Home page */}
        {window.location.pathname === "/" && <Footer />}
      </Router>
    </div>
  );
};

export default App;
