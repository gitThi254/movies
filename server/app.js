const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const movieRouter = require("./Routes/movieRoutes");
let app = express();
app.use(cors());

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/movies", movieRouter);

module.exports = app;
