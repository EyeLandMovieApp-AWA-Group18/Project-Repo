import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home.js'; 
import Profile from './pages/Profile.js';
import MovieDetail from './pages/moiveDetail.js';
import Authentication from './pages/Authentication.js';
import RemoveAccount from './pages/RemoveAccount.js';
import SearchPage from './pages/searchPage.js';
import ShowtimesPage from './pages/ShowtimesPage.js';
import './App.css';

  
const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<MovieDetail />} /> 
          <Route path="/auth" element={<Authentication />} />
          <Route path="/removeaccount" element={<RemoveAccount />} /> 
          <Route path="/auth" element={<Authentication />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>

        {/* Conditionally render Footer only on the Home page */}
        {window.location.pathname === "/" && <Footer />}
      </Router>
    </div>
  );
}


export default App;
