const express = require("express");

const { suggest } = require("../controllers/suggest");

const router = express.Router({ mergeParams: true });

router.route("/").post(suggest);

module.exports = router;
