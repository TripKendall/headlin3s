const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Org = require("../models/Org");
const path = require("path");

// ** @desc   Get 10 galleries
// ** @route  GET /api/v1/galleries
// ** @access Public

exports.getOrgs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


// ** @desc   Get single org
// ** @route  GET /api/v1/galleries/:id
// ** @access Public
exports.getOrg = asyncHandler(async (req, res, next) => {
  const org = await Org.findById(req.params.id);

  if (!org) {
    return next(new ErrorResponse("Org is required", 400));
  }

  res.status(200).json({
    success: true,
    data: org,
  });
});

// ** @desc create org
// ** @route  POST /api/v1/galleries/
// ** @access Private
exports.createOrg = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  // const publishedOrg = await Org.findOne({ user: req.user.id });

  // if (publishedOrg && req.user.role !== "admin") {
  //   return next(
  //     new ErrorResponse(
  //       `The user with ID ${req.user.id} has already published a org`,
  //       400
  //     )
  //   );
  // }

  const org = await Org.create(req.body);
  res.status(201).json({
    success: true,
    data: org,
  });
});

// ** @desc Update org
// ** @route  PUT /api/v1/galleries/:id
// ** @access Private
exports.updateOrg = asyncHandler(async (req, res, next) => {
  let org = await Org.findById(req.params.id);

  if (!org) {
    return next(new ErrorResponse("Org is required", 400));
  }

  if (org.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this org`,
        401
      )
    );
  }

  org = await Org.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: org,
  });
});

// ** @desc Delte org
// ** @route DELETE /api/v1/galleries/:id
// ** @access Private
exports.deleteOrg = asyncHandler(async (req, res, next) => {
  const org = await Org.findById(req.params.id);
  if (!org) {
    return res.status(400).json({
      success: false,
    });
  }

  if (org.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this org`,
        401
      )
    );
  }

  org.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// ** @desc Upload Photo
// ** @route PUT /api/v1/galleries/:id/photo
// ** @access Private
exports.orgPhotoUpload = asyncHandler(async (req, res, next) => {
  const org = await Org.findById(req.params.id);

  if (!org) {
    return next(new ErrorResponse("Org not found", 404));
  }

  if (org.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this org`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse("Upload a file?", 400));
  }

  const file = req.files.file;

  if (!file.mimetype.startsWith("link")) {
    return next(new ErrorResponse("Please upload an link", 400));
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `link must be less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.name = `photo_${org._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse("Problem with file upload", 500));
    }

    await Org.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
