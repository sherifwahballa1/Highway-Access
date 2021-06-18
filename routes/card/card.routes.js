const express = require("express");
const router = express.Router({ caseSensitive: false });

const { createNewCard } = require("../../controllers/card");

// ---(testing)-------
// create new employee apis
router.post("/", createNewCard);

module.exports = router;
