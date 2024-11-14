import React from 'react';

const Home = () => {
  return (
    <div>
      <section className="section1">
        <img
          className="section1_img"
          src="https://picsum.photos/1920/600" // Placeholder image
          alt="Movies in theaters now"
        />
        <h2 className="section1_header">In Theaters Now</h2>
      </section>
      <main>
        <h2 className="section2_header">Eyeland; your destination for film discoveries</h2>
      </main>
    </div>
  );
};

export default Home;
