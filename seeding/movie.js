const mongoose = require("mongoose");
const { Movie } = require("../models/movie.model");  // Adjust the path as needed

// Connect to MongoDB (update the connection string with your MongoDB URI)
mongoose.connect("mongodb+srv://rawalmehulsro:Password%40123@saasmonk.nyilz.mongodb.net/?retryWrites=true&w=majority&appName=saasmonk", {
  useNewUrlParser: false,
  useUnifiedTopology: false,
})
  .then(async () => {
    console.log("Connected to MongoDB");

    // Sample Movie Data
    const movies = [
      {
        name: "The Dark Knight",
        releaseDate: new Date("2008-07-18"),
        averageRating: 9.0,
      },
      {
        name: "Inception",
        releaseDate: new Date("2010-07-16"),
        averageRating: 8.8,
      },
      {
        name: "The Matrix",
        releaseDate: new Date("1999-03-31"),
        averageRating: 8.7,
      },
    ];

    // Insert sample movie data
    await Movie.insertMany(movies);
    console.log("Movies data added!");

    // Disconnect after inserting data
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    mongoose.disconnect();
  });
