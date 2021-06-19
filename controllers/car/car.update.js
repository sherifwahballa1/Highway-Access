const mongoose = require("mongoose");
const createError = require("http-errors");

const Car = require("./../../models/car.model");
const catchAsync = require("./../../utils/catchAsync");
const { updateCarValidation } = require("./../../validations/car.validation");

updateCarInfo = catchAsync(async (req, res) => {
  // validate req.body with joi schema validation
  const { error, value } = updateCarValidation.validate(req.body);
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, "") });

  // validate type of carID
  if (!mongoose.isValidObjectId(req.body.carID))
    return next(createError(400, "Invalid car ID"));

  // check if the body is empty
  if (!value.model && !value.brand && !value.plateNo)
    return next(createError(400, "Not provided data to update car info"));

  // check if car exists
  const carExists = await Car.findOne({
    _id: mongoose.Types.ObjectId(req.body.carID),
  }).select("_id");

  if (!carExists)
    return next(createError(401, "There's not exists car with this id"));

  await Car.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.body.carID) },
    value
  );

  return res.status(200).json({ message: "Car info updated successfully" });
});

module.exports = updateCarInfo;
