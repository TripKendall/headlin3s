const express = require("express");

const {
  getOrgs,
  getOrg,
  createOrg,
  updateOrg,
  deleteOrg,
  orgPhotoUpload,
} = require("../controllers/orgs");

const Org = require("../models/Org");
const linkRouter = require("./links");
const router = express.Router();
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.use("/:orgId/links", linkRouter);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), orgPhotoUpload);
router
  .route("/")
  .get(advancedResults(Org), getOrgs)
  // .get(getOrgs)
  .post(protect, authorize("publisher", "admin"), createOrg);
router
  .route("/:id")
  .get(getOrg)
  .put(protect, authorize("publisher", "admin"), updateOrg)
  .delete(protect, authorize("publisher", "admin"), deleteOrg);

module.exports = router;
