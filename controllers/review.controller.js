const { Review } = require("../models/review.model");
const { Movie } = require("../models/movie.model");


// add/ edit review 
exports.addEditReview = async (req, res) => {
  try {
    const { rating, reviewComment, movieId, name, _id } = req?.body;
    const review = await Review.findOne({ _id });
    let result = null;
    if (review) {
      review.reviewerName = name;
      review.rating = Number(rating);
      review.reviewComment = reviewComment;
      review.movieId = movieId;
      await review.save();
      result = review;
    } else {
      const newReview = new Review({
        reviewerName: name,
        rating,
        reviewComment,
        movieId,
      });
      await newReview.save();
      result = newReview;
    }
    
    const reviews = await Review.find({ movieId });
    const movie = await Movie.findOne({ _id: movieId });
    if (!movie.averageRating) {
      movie.averageRating = result.rating;
    } else {
      // average rating
      movie.averageRating =
        Number.parseFloat((movie.averageRating * (reviews.length - 1) + result.rating) * 10) / (10 * (reviews.length - 1 + 1)).toFixed(1);
    }
    await movie.save();
    res.json({ result, movie });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
};


exports.searchMovieReviews = async (req, res) => {
  try {
    const searchQuery = req.query.comment;
    let searchResults = null;
    if (searchQuery) {
      searchResults = await Review.find({ reviewComment: { $regex: `^${searchQuery}`, $options: "i" } });
    }
    res.json(searchResults);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
};


// get movie review using id
exports.getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.id });
    const movie = await Movie.findOne({ _id: req.params.id });
    res.json({ reviews, movie });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
};

// delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id });
    if (review) {
      const movie = await Movie.findOne({ _id: review.movieId });
      const reviews = await Review.find({ movieId: review.movieId });
      if (reviews.length > 1) {
        movie.averageRating =
          Number.parseFloat((movie?.averageRating * reviews?.length - review?.rating) * 10) / (10 * (reviews?.length - 1)).toFixed(1);
      } else {
        movie.averageRating = null;
      }
      await movie.save();
      await Review.deleteOne({ _id: req.params.id });
      res.json("Deleted Successfully");
    } else {
      res.status(400).json("No review found");
    }
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
};




// edit review
// exports.editReview = async (req, res) => {
//   try {
//     const { rating, reviewComment, movieId, name, _id } = req.body;

//     // Find the existing review to edit
//     const existingReview = await Review.findOne({ _id });
//     if (!existingReview) {
//       return res.status(404).json({ error: "Review not found" });
//     }

//     // Update the review with the new data
//     existingReview.reviewerName = name;
//     existingReview.rating = Number(rating);  // Ensure rating is a number
//     existingReview.reviewComment = reviewComment;
//     existingReview.movieId = movieId;
//     await existingReview.save();

//     // Calculate the new average rating for the movie
//     const reviews = await Review.find({ movieId });
//     const movie = await Movie.findOne({ _id: movieId });

//     if (movie) {
//       const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//       const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

//       // Update the movie's average rating
//       movie.averageRating = parseFloat(averageRating.toFixed(1));
//       await movie.save();
//     }

//     res.json({ result: existingReview, movie });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: "Error: " + error.message });
//   }
// };
