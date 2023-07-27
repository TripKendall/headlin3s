const express = require("express");

const { searchLinks } = require("../controllers/search");

const router = express.Router({ mergeParams: true });

router.route("/").post(searchLinks);

module.exports = router;
