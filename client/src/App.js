import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Authentication from './Authentication.js';

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
        <h2>Eyeland; your destination for film discoveries</h2>
      </main>
      <Routes>
        <Route path="/auth" element={<Authentication />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
