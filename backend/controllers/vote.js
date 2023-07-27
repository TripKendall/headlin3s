const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Link = require("../models/Links");

// ** @desc   Vote on links
// ** @route  PUT /api/v1/vote
// ** @access Public
exports.voteLink = asyncHandler(async (req, res, next) => {
	const { vote, id } = req.body;

	console.log(vote, id);

	if (vote === true || (vote === false && id)) {
		if (vote === true) {
			Link.findOneAndUpdate(
				{ _id: id },
				{ $inc: { clicks: 1 } },
				{ new: true },
				function (err, response) {
					if (err) {
						res.status(400).json({
							success: false,
							data: { err },
						});
					} else {
						res.status(200).json({
							success: true,
							data: { response },
						});
					}
				}
			);
		} else if (vote === false) {
			Link.findOneAndUpdate(
				{ _id: id },
				{ $inc: { clicks: -1 } },
				{ new: true },
				function (err, response) {
					if (err) {
						res.status(400).json({
							success: false,
							data: { err },
						});
					} else {
						res.status(200).json({
							success: true,
							data: { response },
						});
					}
				}
			);
		} else {
			return next(new ErrorResponse("Vote must be true or false", 400));
		}
	} else {
		return next(new ErrorResponse("Vote is required", 400));
	}
});
