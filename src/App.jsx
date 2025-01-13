import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css';

const API_KEY = 'a4b7c29c4ada991f28572a97176cfcee';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true); // Start loading

        // Use "search/movie" for query-based search
        const url = query
          ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`; // Default to popular movies if no query

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setMovies(data.results); // Update the movies state with the results
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        setError(err.message); // Update error state if an error occurs
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchMovies(); // Always fetch movies, even with empty query
  }, [query]); // This effect runs when query changes (including initial render)

  const handleSearch = (e) => {
    setQuery(e.target.value); // Update query when user types
  };

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

      {loading && <p>Loading...</p>} {/* Show loading indicator while fetching */}
      {error && <p>Error: {error}</p>} {/* Show error message if something goes wrong */}

      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} /> // Render each movie
          ))
        ) : (
          <p>No movies found</p> // Show if no movies are available
        )}
      </div>
    </div>
  );
}

export default App;
