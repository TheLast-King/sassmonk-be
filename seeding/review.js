const mongoose = require("mongoose");
const { Review } = require("../models/review.model");  // Adjust the path as needed
const {Movie} = require("../models/movie.model")
// Connect to MongoDB (update the connection string with your MongoDB URI)
mongoose.connect("mongodb+srv://rawalmehulsro:Password%40123@saasmonk.nyilz.mongodb.net/?retryWrites=true&w=majority&appName=saasmonk", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("Connected to MongoDB");

    // Find the movies we just added to get their IDs
    const movies = await Movie.find();

    // Sample Review Data (associate with movieIds)
    const reviews = [
      {
        movieId: movies[0]._id,  // The Dark Knight
        reviewerName: "Alice",
        rating: 9,
        reviewComment: "A masterpiece! Heath Ledger's performance as the Joker is unforgettable.",
      },
      {
        movieId: movies[1]._id,  // Inception
        reviewerName: "Bob",
        rating: 8.5,
        reviewComment: "Great concept and execution, but a bit hard to follow at times.",
      },
      {
        movieId: movies[2]._id,  // The Matrix
        reviewerName: "Charlie",
        rating: 9.5,
        reviewComment: "A groundbreaking film that revolutionized the genre.",
      },
    ];

    // Insert sample review data
    await Review.insertMany(reviews);
    console.log("Reviews data added!");

    // Disconnect after inserting data
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    mongoose.disconnect();
  });
