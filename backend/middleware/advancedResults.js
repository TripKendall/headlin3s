// we need the req, res, next but we also have to pass in the model, etc.
// so this is a (arrow) function in a function
const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query }; // copy the req.query object

  // Drop List
  const removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  // map greather ($gt) than and less than appends that $ to query string
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // start building the query
  query = model.find(JSON.parse(queryStr));

  // does the query want Select Fields?
  if (req.query.select) {
    // comma separated string => space separated string for mongoose
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Is it a Sort?
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    console.log("sortBy: ", sortBy)
    if (sortBy === "value") {
      query = query.sort({ value: -1 });
      // console.log("FIRST sortBy value");
    } else {
      query = query.sort(sortBy);
      // console.log("SECOND sortBy: ", sortBy);
    }
  } else {
    query = query.sort("-date_time");
    console.log("default sort");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 24;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // execute query
  const results = await query;

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
