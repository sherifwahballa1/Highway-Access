const mongoose = require("mongoose");

const catchAsync = require("./../../utils/catchAsync");

const Car = require("./../../models/car.model");

carInfoByID = catchAsync(async (req, res) => {
  // check if carID provided with request
  if (!req.params || !req.params.carID)
    return res.status(400).json({ message: "carID required" });

  let carID = req.params.carID;
  // validate type of carID
  if (!mongoose.isValidObjectId(carID))
    return res.status(400).json({ message: "Invalid carID" });

  // check if car exists
  const car = await Car.findOne()
    .byID(carID);

  if (!car)
    return res
      .status(409)
      .json({ message: "There's not exists car with this id" });

  return res.status(200).send(car);
});

module.exports = carInfoByID;
