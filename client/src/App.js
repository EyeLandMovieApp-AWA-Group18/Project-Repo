import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home.js'; 
import SignUp from './pages/signUp.js'; import SignIn from './pages/signIn.js';
import Profile from './pages/Profile.js';
import MovieDetail from './pages/moiveDetail.js';
import Authentication from './Authentication.js';
import RemoveAccount from './pages/RemoveAccount.js';
import './App.css';

  
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
          <Route path="/moviedetail" element={<MovieDetail />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/removeaccount" element={<RemoveAccount />} /> 
          {/* Add more routes for other pages */}
        </Routes>

        {/* Conditionally render Footer only on the Home page */}
        {window.location.pathname === "/" && <Footer />}
      </Router>
    </div>
import SearchPage from './pages/searchPage.js';

const App = () => {
  return (
    <Router>
      <Header />
      <hr className="header-separator" />
      <section className="section1">
        <img
          className="section1_img"
          src="https://picsum.photos/1920/600" // Placeholder image; replace with information from the open source API
          alt="Movies in theaters now"
        />
        <h2 className="section1_header">In Theaters Now</h2>
      </section>
      <main>
        <h2>Eyeland: your destination for film discoveries</h2>
      </main>
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
