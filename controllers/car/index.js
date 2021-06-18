const newCar = require("./car.create");
const updateCarInfo = require("./car.update");
const carInfoByID = require("./car.getByID");
const carsInfo = require("./car.getAll");
const removeCar = require("./car.deleteById");

module.exports = {
  newCar,
  updateCarInfo,
  carInfoByID,
  carsInfo,
  removeCar,
};
