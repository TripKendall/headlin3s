const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Counter = require("../models/Counter");

// ! These are convience functions to get the count of various things in the system
// ! I've done similar my entire career but always thought it was hacky.
// ! Then it turns out with Mongo, hey you can do it like this...
// TODO: That being said, lets fix the findby to use the labels.
// TODO: Get rid of the hard coded ids and use the labels.

// ** @desc   Get link count
// ** @route  GET /api/v1/count
// ** @access Public
exports.getLinkCount = asyncHandler(async (req, res, next) => {
  const counter = await Counter.findById("6393612ca827ed704cbd8a89");

  if (!counter) {
    return next(new ErrorResponse("Counter Not Found", 400));
  }

  let { count } = counter;
  count += 1;

  res.status(200).json({
    success: true,
    data: count,
  });
});

// ** @desc   Get user count
// ** @route  GET /api/v1/userCount
// ** @access Public
exports.getUserCount = asyncHandler(async (req, res, next) => {
  const counter = await Counter.findById("6370899a43779d0c6b5dc7d4");

  if (!counter) {
    return next(new ErrorResponse("Counter Not Found", 400));
  }

  let { count } = counter;

  res.status(200).json({
    success: true,
    data: count,
  });
});