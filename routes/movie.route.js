const router = require("express").Router();

const { addEditMovie, getMovies, deleteMovie } = require("../controllers/movie.controller");

// get all movies
router.get("/", getMovies);

// add / edit any movie 
router.post("/add", addEditMovie);

// delete a movie
router.delete("/delete/:id", deleteMovie);

module.exports = router;
