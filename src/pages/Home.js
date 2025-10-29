import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        // No need for query or apiKey here anymore
        const res = await axios.get("http://localhost:5000/api/search?q=avengers");
        setMovies(res.data.Search || []);
      } catch (error) {
        console.error("Error fetching default movies:", error);
      }
    };
    fetchDefaultMovies();
  }, []);

  return (
    <div className="home">
      <SearchBar />
      <h2>🔥 Popular Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
