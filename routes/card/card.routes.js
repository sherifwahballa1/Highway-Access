const express = require("express");
const router = express.Router({ caseSensitive: false });

const { createNewCard, passingThrough } = require("../../controllers/card");

// ---(testing)-------
// create new employee apis
router.post("/", createNewCard);

router.post("/:carID", passingThrough);

module.exports = router;
