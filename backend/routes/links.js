const express = require("express");

const {
  getLinks,
  getLink,
  addLink,
  updateLink,
  deleteLink,
} = require("../controllers/links");

const Link = require("../models/Links");
const advancedResults = require("../middleware/advancedResults");
const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Link, {
      path: "org",
      select: "name desc",
    }),
    getLinks
  )
  .post(protect, authorize("publisher", "admin"), addLink);

router
  .route("/:id")
  .get(getLink)
  .put(protect, authorize("publisher", "admin"), updateLink)
  .delete(protect, authorize("publisher", "admin"), deleteLink);


module.exports = router;
