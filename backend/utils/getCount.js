const Counter = require("../models/Counter");
var record;

const getCount = async (counterType) => {
  
  if (!Counter) {
    console.log("The counter model cannot be found.");
    return "Error: counter model not found";
  }

  if (counterType === "user") {
    record = "63936210a827ed704cbd8a93";
  } else if (counterType === "link") {
    record = "6393612ca827ed704cbd8a89";
  }

  const counter = await Counter.findById(record);

  if (!counter) {
    console.log("No counter found.");
    return "Error: counter not found";
  }

  let { count } = counter;
  count += 1;
  const update = { count: count };
  let result = await Counter.findByIdAndUpdate(record, update);

  if (!result) {
    console.log("Counter not updated.");
    return "Error - Update failed";
  }

  return count;
};

module.exports = getCount;