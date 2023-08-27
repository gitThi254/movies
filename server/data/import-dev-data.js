const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Movie = require("../Models/movieModel");
dotenv.config({ path: "./config.env" });
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log("DB connection Successful");
  })
  .catch((error) => {
    console.log("Some eror has occured");
  });

const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

const deleteMovies = async () => {
  try {
    await Movie.deleteMany();
    console.log("Data successuflly deleted");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

const importMovies = async () => {
  try {
    await Movie.create(movies);
    console.log("Data successuflly deleted");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importMovies();
}
if (process.argv[2] === "--delete") {
  deleteMovies();
}
