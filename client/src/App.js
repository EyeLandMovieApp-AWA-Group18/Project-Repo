// src/App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <hr className="header-separator" />
      <section className="section1">
        <img
          className="section1_img"
          src="https://picsum.photos/1920/600" // the first big image on the home page, will be later replaced by information from the open source API
          alt="Movies in theaters now"
        />
        <h2 className="section1_header">In Theaters Now</h2>
      </section>
      <main>
        <h2>Eyeland; your destination for film discoveries</h2>
      </main>
      <Footer />
    </div>
  );
}

export default App;
