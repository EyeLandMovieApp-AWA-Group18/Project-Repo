import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from '../components/Footer';
import { NowPlayingSection, MoviesSection } from '../components/MovieSections';
import './home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [casts, setCasts] = useState({});
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const navigate = useNavigate(); // Define navigate using useNavigate

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch now playing movies
        const nowPlayingResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
        );
        setMovies(nowPlayingResponse.data.results);

        // Fetch casts
        const castData = {};
        for (const movie of nowPlayingResponse.data.results) {
          const castResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}&language=en-US`
          );
          castData[movie.id] = castResponse.data.cast.slice(0, 5).map((actor) => actor.name);
        }
        setCasts(castData);

        // Fetch popular, top-rated, and upcoming movies
        const popularResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        setPopularMovies(popularResponse.data.results);

        const topRatedResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
        );
        setTopRatedMovies(topRatedResponse.data.results);

        const upcomingResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
        );
        setUpcomingMovies(upcomingResponse.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [apiKey]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <NowPlayingSection movies={movies} casts={casts} settings={settings} />
      <MoviesSection
        id="popular-movies"
        title="Popular Movies"
        movies={popularMovies}
        navigate={navigate} // Pass navigate to MoviesSection
      />
      <MoviesSection
        id="top-rated-movies"
        title="Top Rated Movies"
        movies={topRatedMovies}
        navigate={navigate} // Pass navigate to MoviesSection
      />
      <MoviesSection
        id="upcoming-movies"
        title="Upcoming Movies"
        movies={upcomingMovies}
        navigate={navigate} 
      />
      <Footer />
    </div>
  );
};

export default Home;
