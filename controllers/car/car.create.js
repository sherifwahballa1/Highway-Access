const mongoose = require("mongoose");

const catchAsync = require("./../../utils/catchAsync");

const Car = require("./../../models/car.model");
const Employee = require("./../../models/employee.model");

const { newCarValidation } = require("./../../validations/car.validation");

newCar = catchAsync(async (req, res) => {
  const { error, value } = newCarValidation.validate(req.body);
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, "") });

  // check employeeID from mongoose objectID type
  if (!mongoose.isValidObjectId(req.body.employeeID))
    return res.status(400).json({ message: "Invalid employee ID" });

  const employee = await Employee.findOne({
    _id: mongoose.Types.ObjectId(value.employeeID),
  }).select("_id");

  // validate if employee exists or not
  if (!employee)
    return res
      .status(409)
      .json({ message: "There's not exists employee with this id" });

  // check if car plate number registered before
  const carExists = await Car.findOne({
    plateNo: value.plateNo,
  }).select("_id");

  if (carExists)
    return res.status(409).json({ message: "Car plate number registered before" });

  let car = await Car.create(value);

  return res.status(200).send(car);
});

module.exports = newCar;
