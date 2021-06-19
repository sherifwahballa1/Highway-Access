const express = require("express");
const router = express.Router({ caseSensitive: true });

const {
  addNewCar,
  updateCarInfo,
  carInfoByID,
  carsInfo,
  removeCar,
} = require("../../controllers/car");

// create regitration for a new car
router.post("/", addNewCar);

// update car info
router.patch("/", updateCarInfo);

// get car info by id
router.get("/:carID", carInfoByID);

// return all cars by page no and limit
router.get("/", carsInfo);

// delete car by id
router.delete("/:carID", removeCar);

module.exports = router;
