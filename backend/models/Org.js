const mongoose = require("mongoose");
const slugify = require("slugify");

const OrgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },

    slug: String,

    desc: {
      type: String,
      required: [true, "Please add a desc"],
      maxlength: [500, "Description can not be more than 500 characters"],
    },

    img: {
      type: String,
      default: "no-photo.jpg",
    },

    tags: {
      type: [String],
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

OrgSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
}),
  OrgSchema.pre("remove", async function (next) {
    console.log(`Deleting links associated with ${this._id}`);
    await this.model("Link").deleteMany({ org: this._id });
    next();
  });


OrgSchema.virtual("link", {
  ref: "Link",
  localField: "_id",
  foreignField: "org",
  justOne: false,
});

module.exports = mongoose.model("Org", OrgSchema);
