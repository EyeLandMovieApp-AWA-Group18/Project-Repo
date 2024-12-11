import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [casts, setCasts] = useState({});
  const [popularMovies, setPopularMovies] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY; // Use environment variable for API key
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch now playing movies
        const nowPlayingResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
        );
        setMovies(nowPlayingResponse.data.results);

        // Fetch casts for each movie
        const fetchCasts = async (movieId) => {
          const castResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
          );
          return castResponse.data.cast.slice(0, 5).map((actor) => actor.name); // Top 5 actors
        };

        const castData = {};
        for (const movie of nowPlayingResponse.data.results) {
          castData[movie.id] = await fetchCasts(movie.id);
        }
        setCasts(castData);

        // Fetch popular movies
        const popularResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        setPopularMovies(popularResponse.data.results);
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

  const PopularMoviesSection = ({ popularMovies }) => {
    const [scrollIndex, setScrollIndex] = useState(0);
    const visibleCards = 5; // Number of cards to show at a time

    const handleNext = () => {
      if (scrollIndex + visibleCards < popularMovies.length) {
        setScrollIndex(scrollIndex + 1);
      }
    };

    const handlePrev = () => {
      if (scrollIndex > 0) {
        setScrollIndex(scrollIndex - 1);
      }
    };

    const handleNavigateToDetails = (movieId) => {
      // Navigate to the movie details page
      navigate(`/movie/${movieId}`);
    };

    return (
      <section id="popular" className="section-popular">
        <h3 className="section2_header">Popular Movies</h3>
        <div className="popular-movies-container">
          <button
            className="popular-movies-arrow prev"
            onClick={handlePrev}
            disabled={scrollIndex === 0}
          >
            &#8592;
          </button>
          <div className="popular-movies-row">
            {popularMovies
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
                    onClick={() => handleNavigateToDetails(movie.id)} // On click, navigate to details page
                  >
                    View Details
                  </button>
                </div>
              ))}
          </div>
          <button
            className="popular-movies-arrow next"
            onClick={handleNext}
            disabled={scrollIndex + visibleCards >= popularMovies.length}
          >
            &#8594;
          </button>
        </div>
      </section>
    );
  };

  return (
    <div>
      <section id="now-playing" className="section1">
        <h3 className="section1_header">In Theaters Now</h3>
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
      <PopularMoviesSection id="popular" popularMovies={popularMovies} />
      <Footer />
    </div>
  );
};

export default Home;
