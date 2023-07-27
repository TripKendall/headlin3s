const express = require("express");

const { voteLink } = require("../controllers/vote");

const router = express.Router({ mergeParams: true });

router.route("/").put(voteLink);

module.exports = router;
