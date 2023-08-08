import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const apiKey = 'e8ccc676e299173067a80520c1fee405';
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: apiKey,
          query: searchTerm,
          page: currentPage,
        },
      });
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  });


  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Search App</h1>
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => handleSearch()}>Search</button>
      </header>
      <main className="Movie-list">
      {movies.length > 0 ? (
  movies.map((movie) => (
    <div className="Movie" key={movie.id}>
      
      <h2>{movie.title}</h2>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  ))
) : (
  <p>No movies found.</p>
)}
      </main>
      <div className="Pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;