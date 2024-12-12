import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const NowPlayingSection = ({ movies, casts, settings, navigate }) => (
  <section id="now-playing" className="section1">
    <h3 className="section1_header">Now Playing</h3>
    <Slider {...settings} className="carousel">
      {movies.map((movie) => (
        <div key={movie.id} className="carousel-slide">
          <div
            className="background-image"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h600_bestv2${movie.backdrop_path})`,
            }}
          ></div>
          <div className="home-movie-details">
            <div className="poster-container">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className="details">
              <h3 className="home-movie-title">{movie.title}</h3>
              <p className="release-date">Release Date: {movie.release_date}</p>
              {casts[movie.id] && (
                <p className="actors">
                  <strong>Actors:</strong> {casts[movie.id].join(', ')}
                </p>
              )}
              <button
                className="watch-trailer-button"
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/results?search_query=${movie.title} trailer`,
                    '_blank'
                  )
                }
              >
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </section>
);

export const MoviesSection = ({ id, title, movies, navigate }) => {
    const [scrollIndex, setScrollIndex] = useState(0);
    const visibleCards = 5;
  
    const handleNext = () => {
      if (scrollIndex + visibleCards < movies.length) {
        setScrollIndex(scrollIndex + 1);
      }
    };
  
    const handlePrev = () => {
      if (scrollIndex > 0) {
        setScrollIndex(scrollIndex - 1);
      }
    };
  
    return (
      <section id={id} className="section-popular">
        <h3 className="section2_header">{title}</h3>
        <div className="popular-movies-container">
          <button
            className="popular-movies-arrow prev"
            onClick={handlePrev}
            disabled={scrollIndex === 0}
          >
            &#8592;
          </button>
          <div className="popular-movies-row">
            {movies
              .slice(scrollIndex, scrollIndex + visibleCards)
              .map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img
                    className="movie-card-poster"
                    src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h4 className="movie-card-title">{movie.title}</h4>
                  <button
                    className="movie-details-button"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
          </div>
          <button
            className="popular-movies-arrow next"
            onClick={handleNext}
            disabled={scrollIndex + visibleCards >= movies.length}
          >
            &#8594;
          </button>
        </div>
      </section>
    );
  };