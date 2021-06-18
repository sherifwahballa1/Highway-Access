const mongoose = require("mongoose");

const catchAsync = require("./../../utils/catchAsync");

const Car = require("./../../models/car.model");

const { updateCarValidation } = require("./../../validations/car.validation");

updateCarInfo = catchAsync(async (req, res) => {
  const { error, value } = updateCarValidation.validate(req.body);
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, "") });

  // validate type of carID
  if (!mongoose.isValidObjectId(req.body.carID))
    return res.status(400).json({ message: "Invalid car ID" });

  // check if car exists
  const carExists = await Car.findOne({
    _id: mongoose.Types.ObjectId(req.body.carID),
  }).select("_id");

  if (!carExists)
    return res
      .status(409)
      .json({ message: "There's not exists cars with this id" });

  // check if the body is empty
  if (!value.model && !value.brand && !value.plateNo)
    return res
      .status(400)
      .json({ message: "Can't update car info with empty data" });

  await Car.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.body.carID) },
    value
  );

  return res.status(200).json({ message: "Car data updated successfully" });
});

module.exports = updateCarInfo;
