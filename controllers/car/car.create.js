const mongoose = require("mongoose");
const createError = require("http-errors");

const Car = require("./../../models/car.model");
const Employee = require("./../../models/employee.model");

const catchAsync = require("./../../utils/catchAsync");
const { newCarValidation } = require("./../../validations/car.validation");

addNewCar = catchAsync(async (req, res, next) => {
  // validate req.body with joi schema validation
  const { error, value } = newCarValidation.validate(req.body);
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, "") });

  // validate employeeID type
  if (!mongoose.isValidObjectId(req.body.employeeID))
    return next(createError(400, "Invalid employee ID"));

  const employee = await Employee.findOne({
    _id: mongoose.Types.ObjectId(value.employeeID),
  }).select("_id");

  // if employee not exists
  if (!employee)
    return next(createError(401, "There's not exists employee with this id"));

  // check if car with this plate_number registered before
  const carExists = await Car.findOne({
    plateNo: value.plateNo,
  }).select("_id");

  if (carExists)
    return next(createError(409, "Car plate number registered before"));

  let car = await Car.create(value);

  return res.status(200).send(car);
});

module.exports = addNewCar;
