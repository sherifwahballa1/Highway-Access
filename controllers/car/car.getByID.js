const mongoose = require("mongoose");
const createError = require("http-errors");

const Car = require("./../../models/car.model");
const catchAsync = require("./../../utils/catchAsync");

carInfoByID = catchAsync(async (req, res) => {
  // check if carID provided with request
  if (!req.params || !req.params.carID)
    return next(createError(400, "carID required"));

  let carID = req.params.carID;
  // validate type of carID
  if (!mongoose.isValidObjectId(carID))
    return next(createError(400, "Invalid carID"));

  // check if car exists
  const car = await Car.findOne().byID(carID);

  if (!car)
    return next(createError(401, "There's not exists car with this id"));

  return res.status(200).send(car);
});

module.exports = carInfoByID;
