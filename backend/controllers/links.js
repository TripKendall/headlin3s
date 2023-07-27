const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Link = require("../models/Links");
const Org = require("../models/Org");
const getCount = require("../utils/getCount");

// ** @desc   Get all links
// ** @route  GET /api/v1/links
// ** @route  GET /api/v1/org/:orgId/links
// ** @access Public
exports.getLinks = asyncHandler(async (req, res, next) => {
  if (req.params.orgId) {
    const links = await Link.find({ org: req.params.orgId });
    return res.status(200).json({
      success: true,
      count: links.length,
      data: links,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// ** @desc   Get single link by Id
// ** @route  GET /api/v1/links/byId/:id
// ** @access Public
exports.getLink = asyncHandler(async (req, res, next) => {
  const link = await Link.findById( req.params.id );

  if (!link) {
    return next(
      new ErrorResponse(`Link not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: link,
  });
});

// ** @desc   Create new link
// ** @route  POST /api/v1/directories/:OrgId/links
// ** @access Private

exports.addLink = asyncHandler(async (req, res, next) => {

  const count = await getCount("link");

  if (!count) {
    return next(new ErrorResponse("Could not retrieve previous count", 404));
  }

  req.body.org = req.params.orgId;
  req.body.user = req.user.id;
  req.body.rating = Math.floor(Math.random() * 10);
  req.body.clicks = 1;
  req.body.date_time = Date.now();

  const org = await Org.findById(req.params.orgId);

  if (!org) {
    return next(
      new ErrorResponse(
        `Org not found with id of ${req.params.orgId}`,
        404
      )
    );
  }

  if (org.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add an link to  ${org._id}`,
        401
      )
    );
  }

  const link = await Link.create(req.body);

  if (!link) {
    return next(
      new ErrorResponse(
        `Could not create link`,
        404
      )
    );
  }

  res.status(201).json({
    success: true,
    newCount: count,
    data: link,
  });
});

// ** @desc Update link
// ** @route  PUT /api/v1/links/:id
// ** @access Private

exports.updateLink = asyncHandler(async (req, res, next) => {
  let link = await Link.findById(req.params.id);
  console.log(req.body)
  if (!link) {
    return next(
      new ErrorResponse(`Link not found with id of ${req.params.id}`, 404)
    );
  }

  if (link.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update link ${link._id}`,
        401
      )
    );
  }

  link = await Link.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: link,
  });
});

// ** @desc   delete link
// ** @route  DELETE /api/v1/links/:id
// ** @access Private

exports.deleteLink = asyncHandler(async (req, res, next) => {
  const link = await Link.findById(req.params.id);

  if (!link) {
    return next(
      new ErrorResponse(`Link not found with id of ${req.params.id}`, 404)
    );
  }

  if (link.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delet link ${link._id}`,
        401
      )
    );
  }

  await link.remove();

  res.status(201).json({
    success: true,
    data: {},
  });
});

// ** @desc Get links to manage
// ** @route GET /api/v1/links/manage
// ** @access Private
exports.manageLinks = asyncHandler(async (req, res, next) => {
  if (req.params.orgId) {
    const links = await Link.find({ org: req.params.orgId });
    return res.status(200).json({
      success: true,
      count: links.length,
      data: links,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
