const mongoose = require("mongoose");
const moviesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: String,
  duration: { type: Number, required: [true, "duration is required field"] },
  ratings: {
    type: Number,
    required: [true, "ratings is required field"],
  },
  totalRating: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    required: [true, "Release yer is required field"],
  },
  releaseDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  directors: {
    type: [String],
    required: [true, "Directors is required field!"],
  },
  coverImage: {
    type: String,
    require: [true, "Cover image is required field!"],
  },
  actors: {
    type: [String],
    required: [true, "actors is required field!"],
  },
  price: {
    type: Number,
    require: [true, "Price is required field"],
  },
});

const Movie = mongoose.model("Movie", moviesSchema);
module.exports = Movie;
