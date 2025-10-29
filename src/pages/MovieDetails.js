import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const apiKey = process.env.REACT_APP_OMDB_API_KEY;
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`);
        setMovie(res.data);

        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.some((m) => m.imdbID === res.data.imdbID));
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      favorites = favorites.filter((m) => m.imdbID !== movie.imdbID);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (!movie) return <p className="loading">Loading...</p>;

  return (
    <div className="movie-details">
      <div className="details-container">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
          alt={movie.Title}
        />
        <div className="info">
          <h1>{movie.Title}</h1>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>
          <p className="overview">{movie.Plot}</p>

          <button className="fav-btn" onClick={handleFavorite}>
            {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
