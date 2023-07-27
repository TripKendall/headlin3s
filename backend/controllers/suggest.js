const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const sendEmail = require("../utils/sendEmail");

// ** @desc   suggest
// ** @route  POST /api/v1/suggest
// ** @access Public

exports.suggest = asyncHandler(async (req, res, next) => {

  let { 
    emailAddress, 
    linkUrl, 
    linkTitle, 
    linkDescription, 
    linkCat, 
    linkTags } = req.body;

  if (emailAddress && emailAddress.length > 0) {
    emailAddress = emailAddress.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailAddress)) {
      return next(new ErrorResponse("Please provide a valid email", 400));
    }
  } else {
    return next(new ErrorResponse("Please provide an email", 400));
  }

  // make sure the linkUrl is a valid url
  if (linkUrl && linkUrl.length > 0) {
    linkUrl = linkUrl.trim();
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(linkUrl)) {
      // linkUrl is not valid
      return next(new ErrorResponse("Please provide a valid link", 400));
    }
  } else {
    return next(new ErrorResponse("Please provide a link", 400));
  }

  // Test it, but I think this means that as long as the linkUrl is valid, 
  // and the email address is valid, then we'l make it through the above.

  const message = `email: ${emailAddress} link: ${linkUrl} title: ${linkTitle} description: ${linkDescription} category: ${linkCat} tags: ${linkTags}`

  try {
    await sendEmail({
      email: "james@jamesturner.dev",
      subject: "Suggest Headlin3",
      message,
    });
    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Email could not be sent", 500));
  }
});
