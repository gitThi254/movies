const Movie = require("./../Models/movieModel");

exports.getAllMovies = async (req, res) => {
  try {
    const excludeFields = ["sort", "page", "limit", "fields"];
    const queryObj = { ...req.query };
    excludeFields.forEach((el) => {
      delete queryObj[el];
    });

    const queryObject = JSON.parse(
      JSON.stringify(queryObj).replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      )
    );

    let query = Movie.find(queryObject);
    let query_count = await Movie.find(queryObject);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createAt");
    }
    if (req.query.fields) {
      const fieldsBy = req.query.fields.split(",").join(" ");
      query = query.select(fieldsBy);
    } else {
      query = query.select("-__v");
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const moviesCount = await Movie.countDocuments();
      if (skip >= moviesCount) {
        throw new Error("this page is not found");
      }
    }
    const movies = await query;
    res.status(200).json({
      status: "success",
      count: movies.length,
      moviesCount: query_count.length,
      skip: skip,
      page: page,
      limit: limit,
      data: {
        movies,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        movie: updateMovie,
      },
    });
  } catch (error) {
    re.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
