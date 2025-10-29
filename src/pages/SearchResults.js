import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "./SearchResults.css";

function SearchResults() {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const apiKey = process.env.REACT_APP_OMDB_API_KEY;
        //const res = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
        const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);

        setMovies(res.data.Search || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="search-results">
      <h2>Results for "{query}"</h2>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
