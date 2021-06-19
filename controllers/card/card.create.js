const mongoose = require("mongoose");
const createError = require("http-errors");

const Car = require("./../../models/car.model");
const Card = require("./../../models/card.model");

const catchAsync = require("./../../utils/catchAsync");
const { newCardValidation } = require("./../../validations/card.validation");

createNewCard = catchAsync(async (req, res, next) => {
  const { error, value } = newCardValidation.validate(req.body);
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, "") });

  // validate type of carID
  if (!mongoose.isValidObjectId(value.carID))
    return next(createError(400, "Invalid car ID"));

  // check if car exists
  const car = await Car.findOne().byID(value.carID);

  if (!car)
    return next(createError(401, "There's not exists car with this id"));

  // check if card with this car id exists
  const card = await Card.findOne({
    carID: mongoose.Types.ObjectId(value.carID),
  });

  if (card) return next(createError(409, "Car already registered before"));

  value.credits = 10;
  let newCard = await Card.create(value);

  return res.status(200).send(newCard);
});

module.exports = createNewCard;
