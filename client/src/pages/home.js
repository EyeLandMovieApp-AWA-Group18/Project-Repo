import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import Footer from '../components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [casts, setCasts] = useState({});
  const apiKey =process.env.REACT_APP_TMDB_API_KEY;// Use environment variable for API key

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
        );
        setMovies(response.data.results);

        // Fetch casts for each movie
        const fetchCasts = async (movieId) => {
          const castResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
          );
          return castResponse.data.cast.slice(0, 5).map((actor) => actor.name); // Top 5 actors
        };

        const castData = {};
        for (const movie of response.data.results) {
          castData[movie.id] = await fetchCasts(movie.id);
        }
        setCasts(castData);
      } catch (error) {
        console.error('Error fetching movies or casts:', error);
      }
    };

    fetchMovies();
  }, []);

  // Settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <button className="slick-next">Next</button>,
    prevArrow: <button className="slick-prev">Previous</button>,
  };

  return (
    <div>
      <section className="section1">
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
        <h3 className="section1_header">In Theaters Now</h3>
      </section>
      <main>
        <h3 className="section2_header">Eyeland; your destination for film discoveries</h3>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
