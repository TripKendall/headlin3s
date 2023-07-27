const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    min: 1,
    required: [true, "this is a bad error - please fix"],
  },
  label: {
    type: String,
    min: 1,
    required: [true, "this is a bad error - please fix"],
  },
});

module.exports = mongoose.model("Counter", CounterSchema);
