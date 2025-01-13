// src/App.js
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css';

const API_KEY = 'a4b7c29c4ada991f28572a97176cfcee';
const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie App</h1>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={handleSearch}
          className="search-bar"
        />
      </header>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default App;
