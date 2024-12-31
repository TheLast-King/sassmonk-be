const router = require("express").Router();

const {addEditReview, getMovieReviews, searchMovieReviews, editReview, deleteReview} = require("../controllers/review.controller")



// router.get("/search", searchMovieReviews);


// get movie review using movie id
router.get("/:id", getMovieReviews);

// add new review of any movie(using its id)
router.post("/add", addEditReview)

// router.put("/edit", editReview);

router.delete("/delete/:id", deleteReview);

module.exports = router;
