const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const API_KEY = process.env.OMDB_API_KEY;

// ✅ Route for searching movies
app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// ✅ Route for movie details
app.get("/api/movie/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
