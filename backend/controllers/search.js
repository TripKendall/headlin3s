const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Link = require("../models/Links");

// ** @desc   Search all links
// ** @route  POST /api/v1/search
// ** @access Public
exports.searchLinks = asyncHandler(async (req, res, next) => {
  var { searchTerm } = req.body;

  if (searchTerm) {
    searchTerm = searchTerm.trim();
    searchTerm = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    console.log(searchTerm)

    const stopWords = [
      'and', 'or', 'this', 'fuck', 'the', "if", "find", "that",
      "then", "else", "when", "where", "how", "all", "any", "both",
      "each", "few", "more", "most", "other", "some", "such", "no",
    ];

    searchTerm = searchTerm.replace(new RegExp('\\b('+stopWords.join('|')+')\\b', 'g'), '');

    console.log(searchTerm);

    Link.find({ $text: { $search: searchTerm } }).limit(10).exec(function (err, results) {
      return res.status(200).json({
        success: true,
        count: results.length,
        data: results,
      });

    });
  } else {
    return next(new ErrorResponse(`Please add a search term`, 400));
  }
});
