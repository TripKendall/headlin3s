// This replaces having to have try / catch in every async route
// Express handles sync errors, and v5 handles async errors...
// but this handles them for now by wrapping the async function

//https://www.acuriousanimal.com/blog/20180315/express-async-middleware

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
