const express = require("express");
const router = express.Router({ caseSensitive: false });

const { create } = require("../../controllers/employee");

// ---(testing)-------
// create new employee apis 
router.post("/", create);

module.exports = router;
