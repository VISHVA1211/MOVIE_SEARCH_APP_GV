import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((m) => m.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <div className="favorites">
      <h2>❤️ Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <div className="movie-list">
          {favorites.map((movie) => (
            <div key={movie.id} className="fav-card">
              <MovieCard movie={movie} />
              <button
                className="remove-btn"
                onClick={() => removeFavorite(movie.id)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
