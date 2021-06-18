// api for testing and register new employees

const mongoose = require("mongoose");
const catchAsync = require("./../../utils/catchAsync");
const Employee = require("./../../models/employee.model");

const {
  newEmployeeValidation,
} = require("./../../validations/employee.validation");

newEmployee = catchAsync(async (req, res) => {
  const { error, value } = newEmployeeValidation.validate(req.body);
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, "") });

  employee = await Employee.create(value);

  return res.status(200).send(employee);
});

module.exports = newEmployee;
