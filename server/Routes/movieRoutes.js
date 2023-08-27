const express = require("express");
const router = express.Router();
const movieController = require("./../Controllers/moviesControler");

router
  .route("/")
  .get(movieController.getAllMovies)
  .post(movieController.createMovie);

router
  .route("/:id")
  .get(movieController.getMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
