const mongoose = require("mongoose");
const slugify = require("slugify");

const LinkSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add a name"],
  },
  slug: String,
  url: {
    type: String,
    match: [
      /^((http|https|ftp):\/\/)?(www.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  image: {
    type: String,
    // match: [
    //   /^((http|https|ftp):\/\/)?(www.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    //   "Please use a webp image",
    // ],
    required : [true, "Please add an image"],
    default: "random6.webp",
  },
  desc: {
    type: String,
    required: [true, "Please add a desc"],
  },
  clicks: {
    type: Number,
    required: [true, "How many clicks?"],
    default: 0,
  },
  rating: {
    type: Number,
    default: 1,
  },
  similar: {
    type: [String],
  },
  tags: {
    type: [String],
    required: true,
  },
  pol: {
    type: Number,
    enum: [-2, -1, 0, 1, 2],
    required: true,
  },
  category: {
    type: String,
    enum: [
      "sports",
      "news",
      "youtube",
      "dev",
      "politics",
      "media",
      "social media",
      "crypto",
      "tech",
      "podcasts",
      "business",
      "blogs",
      "health",
      "video",
      "editorial",
      "other",
    ],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  date_time: {
    type: Number,
    required: false,
  },
  dateline: {
    type: String,
    required: true,
  },
  org: {
    type: mongoose.Schema.ObjectId,
    ref: "Org",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
},

);

LinkSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
}),

LinkSchema.index({ name: "text", desc: "text", tags: "text" });

module.exports = mongoose.model("Link", LinkSchema);
