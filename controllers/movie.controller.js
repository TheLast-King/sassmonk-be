const { Movie } = require("../models/movie.model");
const { Review} = require("../models/review.model");

// get all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error: " + error);
  }
};

//  add movie, edit movie when passed with id
exports.addEditMovie = async (req, res) => {
  try {
    const { name, releaseDate, _id } = req?.body;
    const movie = await Movie.findOne({ _id });
    if (movie) {
      movie.name = name;
      movie.releaseDate = releaseDate;
      await movie.save();
      res.json(movie);
    } else {
      const newMovie = new Movie({
        name,
        releaseDate,
      });
      await newMovie.save();
      res.json(newMovie);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Error: " + error);
  }
};

// delete movie using id
exports.deleteMovie = async (req, res) => {
  try {
    await Review.deleteMany({ movieId: req.params.id });
    await Movie.deleteOne({_id: req.params.id})
    res.json("Deleted Successfully")
  } catch (error) {
    console.log(error);
    res.status(400).json("Error: " + error);
  }
};
